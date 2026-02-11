#!/usr/bin/env python3
"""
Content ingestion tool for converting old site content to MDX format.
Focuses on "Spesialiserte fagområder" content with professional rewriting.
"""

import json
import re
import yaml
from pathlib import Path
from datetime import datetime
from bs4 import BeautifulSoup
from markdownify import markdownify
from slugify import slugify
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ContentIngester:
    def __init__(self, audit_dir='../audit', output_dir='../../content/spesialiserte-fagomrader'):
        self.audit_dir = Path(audit_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Load mapping and old site data
        self.mapping = self.load_mapping()
        self.old_data = self.load_old_site_data()
        
        # Professional terminology mapping
        self.terminology_map = {
            'bekkenbunn': 'bekkenbunn',
            'urininkontinens': 'urininkontinens',
            'avføringslekkasje': 'avføringslekkasje',
            'bekkensmerter': 'bekkensmerter',
            'fysioterapi': 'fysioterapi',
            'utredning': 'utredning',
            'behandling': 'behandling',
            'diagnostikk': 'diagnostikk'
        }
    
    def load_mapping(self):
        """Load page mapping from audit results"""
        mapping_file = self.audit_dir / 'mapping.json'
        if mapping_file.exists():
            with open(mapping_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            logger.error(f"Mapping file not found: {mapping_file}")
            return []
    
    def load_old_site_data(self):
        """Load old site data"""
        old_data_file = self.audit_dir / 'old_site_data.json'
        if old_data_file.exists():
            with open(old_data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            logger.error(f"Old site data not found: {old_data_file}")
            return {'pages': []}
    
    def is_specialized_content(self, page_data):
        """Check if page is related to specialized medical areas"""
        url = page_data.get('url', '').lower()
        title = page_data.get('title', '').lower()
        content = page_data.get('text_content', '').lower()
        
        # Keywords that indicate specialized medical content
        specialized_keywords = [
            'gynekologi', 'urologi', 'fysioterapi', 'sykepleie',
            'gastroenterologi', 'nevrologi', 'bekkenbunn',
            'urininkontinens', 'avføringslekkasje', 'bekkensmerter',
            'utredning', 'diagnostikk', 'behandling', 'fagområde',
            'spesialisert', 'klinisk', 'medisinsk'
        ]
        
        text_to_check = f"{url} {title} {content}"
        return any(keyword in text_to_check for keyword in specialized_keywords)
    
    def clean_html_content(self, html_content):
        """Clean and normalize HTML content"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove unwanted elements
        for element in soup(['script', 'style', 'nav', 'footer', 'header', 'aside']):
            element.decompose()
        
        # Clean up links - make them more descriptive
        for link in soup.find_all('a'):
            if link.get('href'):
                # If link text is generic, try to make it more descriptive
                link_text = link.get_text().strip()
                if link_text in ['Les mer', 'Klikk her', 'Link', 'Mer info']:
                    # Try to extract context from surrounding text
                    parent_text = link.parent.get_text().strip() if link.parent else ''
                    if parent_text:
                        # Use first few words of parent as link text
                        words = parent_text.split()[:3]
                        link.string = ' '.join(words)
        
        # Ensure proper heading hierarchy
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        for i, heading in enumerate(headings):
            if i == 0 and heading.name != 'h2':
                heading.name = 'h2'
            elif i > 0 and heading.name == 'h1':
                heading.name = 'h2'
        
        return str(soup)
    
    def rewrite_content_professionally(self, content):
        """Rewrite content for professional clarity while preserving medical accuracy"""
        # Remove excessive whitespace
        content = re.sub(r'\s+', ' ', content)
        
        # Fix common Norwegian medical writing issues
        replacements = {
            r'\bdet er viktig å\b': 'Det er viktig å',
            r'\bdet kan være\b': 'Det kan være',
            r'\bdet er mulig å\b': 'Det er mulig å',
            r'\bdet anbefales å\b': 'Det anbefales å',
            r'\bdet er nødvendig å\b': 'Det er nødvendig å',
            r'\bpasienter med\b': 'Personer med',
            r'\bpasienter som\b': 'Personer som',
            r'\bfor pasienter\b': 'for personer',
            r'\btil pasienter\b': 'til personer',
            r'\bhos pasienter\b': 'hos personer',
        }
        
        for pattern, replacement in replacements.items():
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
        
        # Ensure sentences start with capital letters
        sentences = content.split('. ')
        sentences = [s.strip().capitalize() for s in sentences if s.strip()]
        content = '. '.join(sentences)
        
        return content
    
    def generate_alt_text(self, img_element):
        """Generate descriptive alt text for images"""
        alt_text = img_element.get('alt', '').strip()
        if alt_text:
            return alt_text
        
        # Try to generate alt text from context
        src = img_element.get('src', '')
        filename = Path(src).stem if src else 'bilde'
        
        # Look for context in surrounding text
        parent = img_element.parent
        if parent:
            context_text = parent.get_text().strip()
            if context_text:
                # Use first few words as context
                words = context_text.split()[:4]
                return f"Bilde som illustrerer {' '.join(words)}"
        
        return f"Bilde: {filename}"
    
    def convert_to_mdx(self, page_data):
        """Convert page data to MDX format"""
        url = page_data['url']
        title = page_data.get('title', '')
        content = page_data.get('text_content', '')
        
        # Generate slug from URL or title
        slug = slugify(title) if title else slugify(Path(url).stem)
        
        # Create frontmatter
        frontmatter = {
            'title': title or 'Spesialiserte fagområder',
            'description': f'Profesjonell informasjon om {title.lower() if title else "bekkenbunnshelse"} for helsepersonell og pasienter.',
            'section': 'spesialiserte-fagomrader',
            'source': 'nekib',
            'lastSynced': datetime.now().isoformat(),
            'slug': slug,
            'originalUrl': url
        }
        
        # Rewrite content professionally
        rewritten_content = self.rewrite_content_professionally(content)
        
        # Create MDX content
        mdx_content = f"""---
{yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True)}---

# {title}

{rewritten_content}

## Kilder og referanser

Denne informasjonen er basert på evidensbasert medisin og nasjonale retningslinjer. For oppdatert informasjon, se [NBH](https://nekib.helsekompetanse.no) eller kontakt din behandler.

---

*Sist oppdatert: {datetime.now().strftime('%d.%m.%Y')}*
"""
        
        return mdx_content, slug
    
    def process_specialized_content(self):
        """Process all specialized content and convert to MDX"""
        logger.info("Processing specialized content...")
        
        processed_count = 0
        skipped_count = 0
        
        for page_data in self.old_data.get('pages', []):
            if not self.is_specialized_content(page_data):
                skipped_count += 1
                continue
            
            try:
                mdx_content, slug = self.convert_to_mdx(page_data)
                
                # Save MDX file
                output_file = self.output_dir / f"{slug}.mdx"
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(mdx_content)
                
                processed_count += 1
                logger.info(f"Processed: {page_data.get('title', 'Untitled')} -> {output_file}")
                
            except Exception as e:
                logger.error(f"Error processing {page_data.get('url', 'unknown')}: {e}")
                continue
        
        logger.info(f"Processing complete: {processed_count} files processed, {skipped_count} skipped")
        return processed_count
    
    def create_index_page(self):
        """Create index page listing all specialized content"""
        mdx_files = list(self.output_dir.glob('*.mdx'))
        
        if not mdx_files:
            logger.warning("No MDX files found to create index")
            return
        
        # Read frontmatter from all files to create index
        topics = []
        for mdx_file in mdx_files:
            try:
                with open(mdx_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Extract frontmatter
                    if content.startswith('---'):
                        frontmatter_end = content.find('---', 3)
                        if frontmatter_end > 0:
                            frontmatter_yaml = content[3:frontmatter_end]
                            frontmatter = yaml.safe_load(frontmatter_yaml)
                            topics.append({
                                'title': frontmatter.get('title', ''),
                                'description': frontmatter.get('description', ''),
                                'slug': frontmatter.get('slug', ''),
                                'lastSynced': frontmatter.get('lastSynced', '')
                            })
            except Exception as e:
                logger.error(f"Error reading {mdx_file}: {e}")
        
        # Create index content
        index_content = f"""---
title: "Spesialiserte fagområder"
description: "Profesjonell informasjon om bekkenbunnshelse for helsepersonell og pasienter."
section: "spesialiserte-fagomrader"
lastUpdated: "{datetime.now().isoformat()}"
---

# Spesialiserte fagområder

Velkommen til vår samling av spesialiserte fagområder innen bekkenbunnshelse. Her finner du detaljert, profesjonell informasjon for helsepersonell og pasienter.

## Tilgjengelige emner

{chr(10).join([f"- [{topic['title']}](./{topic['slug']})" for topic in topics])}

## Om disse ressursene

Disse ressursene er utarbeidet basert på:
- Evidensbasert medisin
- Nasjonale retningslinjer
- Klinisk erfaring
- Pasientperspektiv

For oppdatert informasjon, se [NBH](https://nekib.helsekompetanse.no) eller kontakt din behandler.

---

*Sist oppdatert: {datetime.now().strftime('%d.%m.%Y')}*
"""
        
        # Save index file
        index_file = self.output_dir / 'index.mdx'
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(index_content)
        
        logger.info(f"Created index page: {index_file}")

def main():
    ingester = ContentIngester()
    
    # Process specialized content
    processed_count = ingester.process_specialized_content()
    
    if processed_count > 0:
        # Create index page
        ingester.create_index_page()
        logger.info("Content ingestion completed successfully!")
    else:
        logger.warning("No specialized content found to process")

if __name__ == "__main__":
    main()
