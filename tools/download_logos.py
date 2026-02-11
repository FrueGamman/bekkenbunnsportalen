#!/usr/bin/env python3
"""
Logo downloader for organizations.
Downloads logos from organization websites for use in the React component.
"""

import requests
import json
import os
import time
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class LogoDownloader:
    def __init__(self, organizations_file='organizations_data.json'):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'PelvicReact-LogoDownloader/1.0 (Educational Purpose)'
        })
        
        # Load organization data
        with open(organizations_file, 'r', encoding='utf-8') as f:
            self.data = json.load(f)
        
        self.logos_dir = Path('../public/logos')
        self.logos_dir.mkdir(exist_ok=True)
    
    def find_logo_on_page(self, url, org_name):
        """Try to find organization logo on their website"""
        try:
            logger.info(f"Looking for logo on {url}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Common logo selectors
            logo_selectors = [
                'img[alt*="logo" i]',
                'img[class*="logo" i]',
                'img[id*="logo" i]',
                '.logo img',
                '#logo img',
                'header img',
                '.header img',
                '.navbar img',
                '.nav img'
            ]
            
            potential_logos = []
            
            for selector in logo_selectors:
                imgs = soup.select(selector)
                for img in imgs:
                    src = img.get('src')
                    if src:
                        # Resolve relative URLs
                        logo_url = urljoin(url, src)
                        alt_text = img.get('alt', '').lower()
                        
                        # Score based on relevance
                        score = 0
                        if 'logo' in alt_text:
                            score += 10
                        if any(word in alt_text for word in org_name.lower().split()):
                            score += 5
                        if img.get('class') and any('logo' in cls.lower() for cls in img.get('class')):
                            score += 8
                        
                        potential_logos.append({
                            'url': logo_url,
                            'alt': alt_text,
                            'score': score,
                            'width': img.get('width'),
                            'height': img.get('height')
                        })
            
            # Sort by score and return best match
            potential_logos.sort(key=lambda x: x['score'], reverse=True)
            
            if potential_logos:
                return potential_logos[0]['url']
            
            return None
            
        except Exception as e:
            logger.error(f"Error finding logo on {url}: {e}")
            return None
    
    def download_logo(self, logo_url, org_id):
        """Download logo and save to public/logos directory"""
        try:
            logger.info(f"Downloading logo from {logo_url}")
            response = self.session.get(logo_url, timeout=30)
            response.raise_for_status()
            
            # Determine file extension
            parsed_url = urlparse(logo_url)
            ext = Path(parsed_url.path).suffix
            if not ext:
                # Try to determine from content type
                content_type = response.headers.get('content-type', '')
                if 'png' in content_type:
                    ext = '.png'
                elif 'jpg' in content_type or 'jpeg' in content_type:
                    ext = '.jpg'
                elif 'svg' in content_type:
                    ext = '.svg'
                else:
                    ext = '.png'  # Default
            
            filename = f"{org_id}{ext}"
            filepath = self.logos_dir / filename
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            logger.info(f"Saved logo to {filepath}")
            return f"/logos/{filename}"
            
        except Exception as e:
            logger.error(f"Error downloading logo from {logo_url}: {e}")
            return None
    
    def process_organizations(self):
        """Process all organizations and try to download their logos"""
        updated_data = self.data.copy()
        
        for category in ['national', 'international']:
            for i, org in enumerate(self.data['component_data'][category]):
                org_name = org['name']
                org_link = org['link']
                org_id = org['id']
                
                if org_link and org_link != '#':
                    logger.info(f"Processing {org_name}")
                    
                    # Try to find logo on organization's website
                    logo_url = self.find_logo_on_page(org_link, org_name)
                    
                    if logo_url:
                        # Download the logo
                        local_logo_path = self.download_logo(logo_url, org_id)
                        
                        if local_logo_path:
                            # Update the data
                            updated_data['component_data'][category][i]['logo'] = local_logo_path
                            updated_data['scraped_data'][category][i]['logo'] = local_logo_path
                    
                    # Be respectful with requests
                    time.sleep(2)
        
        return updated_data
    
    def save_updated_data(self, updated_data, output_file='organizations_data_with_logos.json'):
        """Save updated organization data with logo paths"""
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(updated_data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Saved updated data to {output_file}")

def main():
    downloader = LogoDownloader()
    
    logger.info("Starting logo download process...")
    updated_data = downloader.process_organizations()
    
    # Save updated data
    downloader.save_updated_data(updated_data)
    
    logger.info("Logo download process completed!")
    
    # Print summary
    national_with_logos = sum(1 for org in updated_data['component_data']['national'] if org.get('logo'))
    international_with_logos = sum(1 for org in updated_data['component_data']['international'] if org.get('logo'))
    
    print(f"\n=== LOGO DOWNLOAD SUMMARY ===")
    print(f"National organizations with logos: {national_with_logos}/{len(updated_data['component_data']['national'])}")
    print(f"International organizations with logos: {international_with_logos}/{len(updated_data['component_data']['international'])}")

if __name__ == "__main__":
    main()
