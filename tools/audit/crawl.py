#!/usr/bin/env python3
"""
Content crawler for old and new sites.
Crawls both sites and extracts content, links, images, and videos.
"""

import requests
import yaml
import json
import time
import re
from urllib.parse import urljoin, urlparse, parse_qs
from bs4 import BeautifulSoup
from readability import Document
from slugify import slugify
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class SiteCrawler:
    def __init__(self, config_path='sites.yaml'):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': self.config.get('user_agent', 'PelvicReact-AuditBot/1.0')
        })
        
        self.visited_urls = set()
        self.crawled_data = {
            'old': {'pages': [], 'media': []},
            'new': {'pages': [], 'media': []}
        }
    
    def normalize_url(self, url, base_url):
        """Normalize URL and remove fragments/query params for comparison"""
        parsed = urlparse(urljoin(base_url, url))
        # Remove fragment and common query params
        query_params = parse_qs(parsed.query)
        filtered_params = {k: v for k, v in query_params.items() 
                          if k not in ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid']}
        
        if filtered_params:
            query_string = '&'.join([f"{k}={v[0]}" for k, v in filtered_params.items()])
            normalized = f"{parsed.scheme}://{parsed.netloc}{parsed.path}?{query_string}"
        else:
            normalized = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
        
        return normalized.rstrip('/')
    
    def extract_content(self, html, url):
        """Extract main content using readability"""
        try:
            doc = Document(html)
            content_html = doc.summary()
            soup = BeautifulSoup(content_html, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style", "nav", "footer", "header"]):
                script.decompose()
            
            # Extract text content
            text_content = soup.get_text()
            text_content = re.sub(r'\s+', ' ', text_content).strip()
            
            # Extract headings
            headings = []
            for i in range(1, 7):
                for heading in soup.find_all(f'h{i}'):
                    headings.append({
                        'level': i,
                        'text': heading.get_text().strip(),
                        'id': heading.get('id', '')
                    })
            
            # Extract links
            links = []
            for link in soup.find_all('a', href=True):
                href = link['href']
                if href.startswith('http') or href.startswith('/'):
                    links.append({
                        'url': self.normalize_url(href, url),
                        'text': link.get_text().strip(),
                        'title': link.get('title', '')
                    })
            
            # Extract images
            images = []
            for img in soup.find_all('img'):
                src = img.get('src', '')
                if src:
                    images.append({
                        'url': self.normalize_url(src, url),
                        'alt': img.get('alt', ''),
                        'title': img.get('title', ''),
                        'filename': Path(urlparse(src).path).name
                    })
            
            # Extract videos and embeds
            media = []
            for video in soup.find_all(['video', 'iframe']):
                src = video.get('src', '')
                if src:
                    media.append({
                        'type': 'video' if video.name == 'video' else 'embed',
                        'url': self.normalize_url(src, url),
                        'title': video.get('title', ''),
                        'filename': Path(urlparse(src).path).name
                    })
            
            return {
                'url': url,
                'title': doc.title() or '',
                'text_content': text_content,
                'headings': headings,
                'links': links,
                'images': images,
                'media': media,
                'word_count': len(text_content.split()),
                'crawl_timestamp': time.time()
            }
            
        except Exception as e:
            logger.error(f"Error extracting content from {url}: {e}")
            return None
    
    def crawl_site(self, site_type, base_url, max_pages=None):
        """Crawl a site starting from base_url"""
        logger.info(f"Starting crawl of {site_type} site: {base_url}")
        
        to_visit = [base_url]
        max_pages = max_pages or self.config.get('max_pages', 500)
        delay = self.config.get('delay_between_requests', 1.0)
        
        while to_visit and len(self.crawled_data[site_type]['pages']) < max_pages:
            url = to_visit.pop(0)
            normalized_url = self.normalize_url(url, base_url)
            
            if normalized_url in self.visited_urls:
                continue
                
            self.visited_urls.add(normalized_url)
            
            try:
                logger.info(f"Crawling: {url}")
                response = self.session.get(url, timeout=30)
                response.raise_for_status()
                
                # Extract content
                page_data = self.extract_content(response.text, url)
                if page_data:
                    self.crawled_data[site_type]['pages'].append(page_data)
                    
                    # Add internal links to visit queue
                    for link in page_data['links']:
                        link_url = link['url']
                        if (link_url.startswith(base_url) and 
                            link_url not in self.visited_urls and
                            link_url not in to_visit):
                            to_visit.append(link_url)
                    
                    # Collect media
                    self.crawled_data[site_type]['media'].extend(page_data['images'])
                    self.crawled_data[site_type]['media'].extend(page_data['media'])
                
                time.sleep(delay)
                
            except requests.RequestException as e:
                logger.error(f"Error crawling {url}: {e}")
                continue
            except Exception as e:
                logger.error(f"Unexpected error crawling {url}: {e}")
                continue
        
        logger.info(f"Completed crawl of {site_type} site. Found {len(self.crawled_data[site_type]['pages'])} pages")
    
    def save_results(self, output_dir='.'):
        """Save crawled data to JSON files"""
        output_path = Path(output_dir)
        output_path.mkdir(exist_ok=True)
        
        for site_type in ['old', 'new']:
            filename = output_path / f"{site_type}_site_data.json"
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(self.crawled_data[site_type], f, indent=2, ensure_ascii=False)
            logger.info(f"Saved {site_type} site data to {filename}")

def main():
    crawler = SiteCrawler()
    
    # Crawl old site
    crawler.crawl_site('old', crawler.config['old'])
    
    # Reset visited URLs for new site
    crawler.visited_urls.clear()
    
    # Crawl new site
    crawler.crawl_site('new', crawler.config['new'])
    
    # Save results
    crawler.save_results()
    
    logger.info("Crawling completed successfully!")

if __name__ == "__main__":
    main()
