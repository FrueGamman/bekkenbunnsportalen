#!/usr/bin/env python3
"""
Compare old and new site content.
Finds matching pages and identifies missing content.
"""

import json
import pandas as pd
from pathlib import Path
from rapidfuzz import fuzz, process
import re
from slugify import slugify
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ContentComparator:
    def __init__(self, data_dir='.'):
        self.data_dir = Path(data_dir)
        self.old_data = self.load_site_data('old')
        self.new_data = self.load_site_data('new')
        self.content_audit = []
        self.media_audit = []
    
    def load_site_data(self, site_type):
        """Load crawled site data"""
        filename = self.data_dir / f"{site_type}_site_data.json"
        if filename.exists():
            with open(filename, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            logger.error(f"Could not find {filename}")
            return {'pages': [], 'media': []}
    
    def extract_slug(self, url):
        """Extract slug from URL for comparison"""
        path = url.split('/')[-1] if '/' in url else url
        # Remove file extensions and clean up
        slug = re.sub(r'\.(html|php|aspx?)$', '', path, flags=re.IGNORECASE)
        return slugify(slug)
    
    def calculate_text_similarity(self, text1, text2):
        """Calculate text similarity using multiple methods"""
        if not text1 or not text2:
            return 0.0
        
        # Token-based Jaccard similarity
        tokens1 = set(text1.lower().split())
        tokens2 = set(text2.lower().split())
        
        if not tokens1 or not tokens2:
            return 0.0
        
        intersection = len(tokens1.intersection(tokens2))
        union = len(tokens1.union(tokens2))
        jaccard = intersection / union if union > 0 else 0.0
        
        # Fuzzy string matching
        fuzzy_ratio = fuzz.ratio(text1, text2) / 100.0
        
        # Weighted combination
        return (jaccard * 0.6) + (fuzzy_ratio * 0.4)
    
    def find_best_match(self, old_page, new_pages):
        """Find best matching page in new site"""
        best_match = None
        best_score = 0.0
        
        old_url = old_page['url']
        old_slug = self.extract_slug(old_url)
        old_text = old_page.get('text_content', '')
        
        for new_page in new_pages:
            new_url = new_page['url']
            new_slug = self.extract_slug(new_url)
            
            # URL similarity (slug-based)
            url_similarity = fuzz.ratio(old_slug, new_slug) / 100.0
            
            # Text similarity
            text_similarity = self.calculate_text_similarity(
                old_text, 
                new_page.get('text_content', '')
            )
            
            # Title similarity
            title_similarity = fuzz.ratio(
                old_page.get('title', ''), 
                new_page.get('title', '')
            ) / 100.0
            
            # Combined score (weighted)
            combined_score = (
                url_similarity * 0.3 +
                text_similarity * 0.5 +
                title_similarity * 0.2
            )
            
            if combined_score > best_score:
                best_score = combined_score
                best_match = new_page
        
        return best_match, best_score
    
    def compare_pages(self):
        """Compare all pages between old and new sites"""
        logger.info("Comparing pages between old and new sites...")
        
        old_pages = self.old_data.get('pages', [])
        new_pages = self.new_data.get('pages', [])
        
        for old_page in old_pages:
            old_url = old_page['url']
            best_match, score = self.find_best_match(old_page, new_pages)
            
            if best_match:
                status = 'matched' if score >= 0.6 else 'low_similarity'
                notes = f"Text similarity: {score:.2f}"
            else:
                status = 'missing'
                notes = "No matching page found"
            
            self.content_audit.append({
                'type': 'page',
                'page_old': old_url,
                'page_new': best_match['url'] if best_match else '',
                'match_score': score,
                'status': status,
                'notes': notes,
                'old_title': old_page.get('title', ''),
                'new_title': best_match.get('title', '') if best_match else '',
                'old_word_count': old_page.get('word_count', 0),
                'new_word_count': best_match.get('word_count', 0) if best_match else 0
            })
        
        logger.info(f"Compared {len(old_pages)} pages")
    
    def compare_media(self):
        """Compare media files between old and new sites"""
        logger.info("Comparing media files...")
        
        old_media = self.old_data.get('media', [])
        new_media = self.new_data.get('media', [])
        
        # Create lookup for new media by filename
        new_media_by_filename = {}
        for media in new_media:
            filename = media.get('filename', '')
            if filename:
                new_media_by_filename[filename.lower()] = media
        
        for old_media_item in old_media:
            old_filename = old_media_item.get('filename', '').lower()
            old_url = old_media_item['url']
            
            # Try to find by filename
            new_match = new_media_by_filename.get(old_filename)
            
            if new_match:
                # Check alt text similarity if available
                old_alt = old_media_item.get('alt', '')
                new_alt = new_match.get('alt', '')
                alt_similarity = fuzz.ratio(old_alt, new_alt) / 100.0 if old_alt and new_alt else 1.0
                
                status = 'matched' if alt_similarity >= 0.7 else 'low_similarity'
                notes = f"Alt text similarity: {alt_similarity:.2f}"
            else:
                status = 'missing'
                notes = "No matching media found"
            
            self.media_audit.append({
                'type': old_media_item.get('type', 'image'),
                'media_old': old_url,
                'media_new': new_match['url'] if new_match else '',
                'match_score': alt_similarity if new_match else 0.0,
                'status': status,
                'notes': notes,
                'filename': old_media_item.get('filename', ''),
                'old_alt': old_media_item.get('alt', ''),
                'new_alt': new_match.get('alt', '') if new_match else ''
            })
        
        logger.info(f"Compared {len(old_media)} media files")
    
    def generate_summary(self):
        """Generate summary statistics"""
        content_df = pd.DataFrame(self.content_audit)
        media_df = pd.DataFrame(self.media_audit)
        
        summary = {
            'total_old_pages': len(content_df),
            'matched_pages': len(content_df[content_df['status'] == 'matched']),
            'missing_pages': len(content_df[content_df['status'] == 'missing']),
            'low_similarity_pages': len(content_df[content_df['status'] == 'low_similarity']),
            'total_old_media': len(media_df),
            'matched_media': len(media_df[media_df['status'] == 'matched']),
            'missing_media': len(media_df[media_df['status'] == 'missing']),
            'low_similarity_media': len(media_df[media_df['status'] == 'low_similarity'])
        }
        
        return summary
    
    def save_results(self):
        """Save comparison results to CSV files"""
        # Save content audit
        content_df = pd.DataFrame(self.content_audit)
        content_df.to_csv(self.data_dir / 'content_audit.csv', index=False)
        
        # Save media audit
        media_df = pd.DataFrame(self.media_audit)
        media_df.to_csv(self.data_dir / 'media_audit.csv', index=False)
        
        # Save summary
        summary = self.generate_summary()
        with open(self.data_dir / 'audit_summary.json', 'w') as f:
            json.dump(summary, f, indent=2)
        
        logger.info("Saved audit results to CSV files")
        logger.info(f"Summary: {summary}")

def main():
    comparator = ContentComparator()
    comparator.compare_pages()
    comparator.compare_media()
    comparator.save_results()
    
    logger.info("Content comparison completed!")

if __name__ == "__main__":
    main()
