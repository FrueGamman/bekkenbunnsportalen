#!/usr/bin/env python3
"""
Video scraper for NEKIB analirrigasjon page.
Extracts video information and creates data structure for React component.
"""

import requests
import json
import time
import re
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class VideoScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'PelvicReact-VideoScraper/1.0 (Educational Purpose)'
        })
        
        # Video data structure
        self.videos = []
    
    def extract_video_info(self, soup, base_url):
        """Extract video information from the page"""
        videos = []
        
        # Look for video elements and iframes
        video_elements = soup.find_all(['video', 'iframe'])
        
        for element in video_elements:
            video_info = {}
            
            if element.name == 'video':
                # Handle HTML5 video elements
                src = element.get('src')
                if not src:
                    # Check for source elements
                    source = element.find('source')
                    if source:
                        src = source.get('src')
                
                if src:
                    video_info = {
                        'type': 'video',
                        'src': urljoin(base_url, src),
                        'title': element.get('title', ''),
                        'poster': element.get('poster', ''),
                        'controls': element.has_attr('controls'),
                        'autoplay': element.has_attr('autoplay')
                    }
                    videos.append(video_info)
            
            elif element.name == 'iframe':
                # Handle iframe embeds (YouTube, Vimeo, etc.)
                src = element.get('src')
                if src and any(domain in src for domain in ['youtube', 'vimeo', 'wistia', 'brightcove']):
                    video_info = {
                        'type': 'iframe',
                        'src': src,
                        'title': element.get('title', ''),
                        'width': element.get('width', ''),
                        'height': element.get('height', ''),
                        'frameborder': element.get('frameborder', '0')
                    }
                    videos.append(video_info)
        
        return videos
    
    def extract_video_descriptions(self, soup):
        """Extract video descriptions and titles from the page content"""
        descriptions = []
        
        # Based on the provided content, look for video-related text
        video_titles = [
            "Kort introduksjon (Peristeen analirrigasjon)",
            "Fordøyelsessystemet (Peristeen analirrigasjon)", 
            "Røtgenbilder med tykktarm avføring (Peristeen analirrigasjon)",
            "Tarmproblem avføringslekkasje og kronisk forstoppelse (Peristeen analirrigasjon)",
            "Tarmtømming og Peristeen (Peristeen analirrigasjon)",
            "Hvordan bruke Peristeen steg for steg (Peristeen analirrigasjon)",
            "Instruksjon i Navina Classic irrigasjonssystem (Wellspect)",
            "Instruksjon i Peristeen irrigasjonssystem (Coloplast)",
            "Instruksjon i Qufora Irrisedo Ballonsystem irrigasjonssystem (KvinTo AS)",
            "Instruksjon i Aquaflush Irrigasjonssystemer (Global Health Technology)"
        ]
        
        # Look for these titles in the page content
        for title in video_titles:
            # Find elements containing these titles
            elements = soup.find_all(text=re.compile(re.escape(title), re.IGNORECASE))
            for element in elements:
                parent = element.parent
                if parent:
                    # Try to find associated video or link
                    video_container = parent.find_parent(['div', 'section', 'article'])
                    if video_container:
                        # Look for video elements in the container
                        video_elem = video_container.find(['video', 'iframe'])
                        link_elem = video_container.find('a')
                        
                        description_info = {
                            'title': title,
                            'has_video': video_elem is not None,
                            'has_link': link_elem is not None,
                            'link_url': link_elem.get('href') if link_elem else None
                        }
                        descriptions.append(description_info)
        
        return descriptions
    
    def scrape_analirrigasjon_page(self, url):
        """Scrape the analirrigasjon page for video content"""
        logger.info(f"Scraping videos from: {url}")
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract videos
            videos = self.extract_video_info(soup, url)
            
            # Extract video descriptions
            descriptions = self.extract_video_descriptions(soup)
            
            # Create comprehensive video data
            video_data = {
                'page_url': url,
                'page_title': soup.find('title').get_text() if soup.find('title') else '',
                'videos': videos,
                'video_descriptions': descriptions,
                'scrape_timestamp': time.time()
            }
            
            return video_data
            
        except requests.RequestException as e:
            logger.error(f"Error scraping {url}: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error scraping {url}: {e}")
            return None
    
    def create_react_video_data(self, video_data):
        """Create React component compatible video data"""
        if not video_data:
            return None
        
        react_videos = []
        
        # Process actual videos found
        for video in video_data.get('videos', []):
            react_video = {
                'id': f"video_{len(react_videos) + 1}",
                'title': video.get('title', 'Analirrigasjon Video'),
                'type': video.get('type', 'video'),
                'src': video.get('src', ''),
                'thumbnail': video.get('poster', ''),
                'description': 'Instruksjonsvideo for analirrigasjon',
                'category': 'analirrigasjon'
            }
            react_videos.append(react_video)
        
        # Process video descriptions (create placeholder videos)
        for desc in video_data.get('video_descriptions', []):
            react_video = {
                'id': f"desc_video_{len(react_videos) + 1}",
                'title': desc.get('title', ''),
                'type': 'placeholder' if not desc.get('has_video') else 'video',
                'src': desc.get('link_url', ''),
                'thumbnail': '/video-placeholder.png',
                'description': f"Instruksjonsvideo: {desc.get('title', '')}",
                'category': 'analirrigasjon',
                'equipment_type': self.extract_equipment_type(desc.get('title', ''))
            }
            react_videos.append(react_video)
        
        return {
            'category': 'Analirrigasjon',
            'description': 'Instruksjonsvideoer for analirrigasjon og tarmtømming',
            'videos': react_videos,
            'source_url': video_data.get('page_url', ''),
            'last_updated': video_data.get('scrape_timestamp', time.time())
        }
    
    def extract_equipment_type(self, title):
        """Extract equipment type from video title"""
        if 'Peristeen' in title:
            return 'Peristeen (Coloplast)'
        elif 'Navina' in title:
            return 'Navina Classic (Wellspect)'
        elif 'Qufora' in title:
            return 'Qufora Irrisedo (KvinTo AS)'
        elif 'Aquaflush' in title:
            return 'Aquaflush (Global Health Technology)'
        else:
            return 'Generell'
    
    def save_video_data(self, video_data, output_file='analirrigasjon_videos.json'):
        """Save video data to JSON file"""
        output_path = Path(output_file)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(video_data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Saved video data to {output_path}")
        return video_data

def main():
    scraper = VideoScraper()
    
    # Scrape the analirrigasjon page
    url = 'https://nekib.helsekompetanse.no/verktoy/pasientundervisning/analirrigasjon/'
    video_data = scraper.scrape_analirrigasjon_page(url)
    
    if video_data:
        # Create React component data
        react_data = scraper.create_react_video_data(video_data)
        
        # Save results
        output_data = {
            'raw_data': video_data,
            'react_component_data': react_data
        }
        
        scraper.save_video_data(output_data)
        
        # Print summary
        logger.info("Video scraping completed successfully!")
        logger.info(f"Found {len(video_data.get('videos', []))} actual videos")
        logger.info(f"Found {len(video_data.get('video_descriptions', []))} video descriptions")
        
        if react_data:
            print(f"\n=== REACT COMPONENT DATA ===")
            print(f"Category: {react_data['category']}")
            print(f"Description: {react_data['description']}")
            print(f"Total videos: {len(react_data['videos'])}")
            
            for video in react_data['videos']:
                print(f"  - {video['title']} ({video['type']})")
                if video.get('equipment_type'):
                    print(f"    Equipment: {video['equipment_type']}")
        
        return output_data
    else:
        logger.error("Failed to scrape video data")
        return None

if __name__ == "__main__":
    main()
