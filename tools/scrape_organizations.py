#!/usr/bin/env python3
"""
Organization scraper for NEKIB organizations page.
Extracts organization names, links, and logos from the organizations page.
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

class OrganizationScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'PelvicReact-OrgScraper/1.0 (Educational Purpose)'
        })
        
        # Known organizations from the user's request
        self.target_organizations = {
            'national': [
                'NSFs Faggruppe av Sykepleiere i Urologi',
                'Uroterapeutisk Forening',
                'Sykepleiere i Stomiomsorg',
                'Norsk Fysioterapiforbund Faggruppe for Kvinnehelse',
                'Vulvaforum',
                'Smertenettverk'
            ],
            'international': [
                'European Association of Urology',
                'International Continence Society',
                'International Urogynecological Association',
                'European Society of Coloproctology',
                'American Urological Association',
                'International Pelvic Pain Society',
                'International Painful Bladder Foundation',
                'Pelvic, Obstetric and Gynaecological Physiotherapy',
                'The International Society for the Study of Vulvovaginal Disease'
            ]
        }
    
    def normalize_org_name(self, name):
        """Normalize organization name for matching"""
        # Remove common variations and normalize
        name = re.sub(r'\s*\([^)]*\)\s*', '', name)  # Remove parentheses content
        name = re.sub(r'\s+', ' ', name).strip()  # Normalize whitespace
        return name.lower()
    
    def find_organization_match(self, scraped_name):
        """Find matching organization from our target list"""
        normalized_scraped = self.normalize_org_name(scraped_name)
        
        # Check national organizations
        for org in self.target_organizations['national']:
            normalized_target = self.normalize_org_name(org)
            if normalized_target in normalized_scraped or normalized_scraped in normalized_target:
                return {'category': 'national', 'name': org, 'scraped_name': scraped_name}
        
        # Check international organizations
        for org in self.target_organizations['international']:
            normalized_target = self.normalize_org_name(org)
            if normalized_target in normalized_scraped or normalized_scraped in normalized_target:
                return {'category': 'international', 'name': org, 'scraped_name': scraped_name}
        
        return None
    
    def scrape_organizations_page(self, url):
        """Scrape the organizations page for links and logos"""
        logger.info(f"Scraping organizations from: {url}")
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            organizations = {
                'national': [],
                'international': [],
                'unmatched': []
            }
            
            # Look for organization sections
            # Based on the HTML structure, organizations are likely in lists under headings
            
            # Find sections with "Nasjonale" and "Internasjonale" headings
            sections = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
            
            current_category = None
            
            for section in sections:
                section_text = section.get_text().strip().lower()
                
                if 'nasjonale' in section_text:
                    current_category = 'national'
                    logger.info("Found national organizations section")
                elif 'internasjonale' in section_text:
                    current_category = 'international'
                    logger.info("Found international organizations section")
                
                if current_category:
                    # Find the next list after this heading
                    next_element = section.find_next_sibling()
                    while next_element:
                        if next_element.name == 'ul':
                            # Found a list, extract organizations
                            for li in next_element.find_all('li'):
                                org_data = self.extract_organization_data(li, url, current_category)
                                if org_data:
                                    # Try to match with our target organizations
                                    match = self.find_organization_match(org_data['name'])
                                    if match:
                                        org_data['matched_name'] = match['name']
                                        org_data['category'] = match['category']
                                        organizations[match['category']].append(org_data)
                                    else:
                                        organizations['unmatched'].append(org_data)
                            break
                        elif next_element.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
                            # Hit another heading, stop looking
                            break
                        next_element = next_element.find_next_sibling()
            
            # Also look for any links or images that might be organization-related
            # Search for links that might contain organization websites
            all_links = soup.find_all('a', href=True)
            for link in all_links:
                href = link['href']
                link_text = link.get_text().strip()
                
                # Check if this link might be related to any of our organizations
                if link_text:
                    match = self.find_organization_match(link_text)
                    if match:
                        # Update existing organization data or create new entry
                        category_orgs = organizations[match['category']]
                        existing_org = next((org for org in category_orgs if org.get('matched_name') == match['name']), None)
                        
                        if existing_org:
                            if not existing_org.get('link'):
                                existing_org['link'] = urljoin(url, href)
                        else:
                            # Create new organization entry
                            org_data = {
                                'name': link_text,
                                'matched_name': match['name'],
                                'category': match['category'],
                                'link': urljoin(url, href),
                                'logo': None
                            }
                            organizations[match['category']].append(org_data)
            
            return organizations
            
        except requests.RequestException as e:
            logger.error(f"Error scraping {url}: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error scraping {url}: {e}")
            return None
    
    def extract_organization_data(self, li_element, base_url, category):
        """Extract organization data from a list item"""
        org_name = li_element.get_text().strip()
        
        if not org_name:
            return None
        
        # Look for links within this list item
        link_element = li_element.find('a', href=True)
        org_link = None
        if link_element:
            org_link = urljoin(base_url, link_element['href'])
        
        # Look for images (logos) within this list item
        img_element = li_element.find('img')
        org_logo = None
        if img_element and img_element.get('src'):
            org_logo = urljoin(base_url, img_element['src'])
        
        return {
            'name': org_name,
            'link': org_link,
            'logo': org_logo,
            'category': category
        }
    
    def generate_react_component_data(self, organizations):
        """Generate data structure for React component"""
        component_data = {
            'national': [],
            'international': []
        }
        
        # Process national organizations
        for org in organizations.get('national', []):
            component_data['national'].append({
                'id': self.generate_id(org.get('matched_name', org['name'])),
                'name': org.get('matched_name', org['name']),
                'link': org.get('link', '#'),
                'logo': org.get('logo'),
                'scraped_name': org['name']
            })
        
        # Process international organizations
        for org in organizations.get('international', []):
            component_data['international'].append({
                'id': self.generate_id(org.get('matched_name', org['name'])),
                'name': org.get('matched_name', org['name']),
                'link': org.get('link', '#'),
                'logo': org.get('logo'),
                'scraped_name': org['name']
            })
        
        # Add any organizations that weren't found on the page
        self.add_missing_organizations(component_data, organizations)
        
        return component_data
    
    def generate_id(self, name):
        """Generate a URL-safe ID from organization name"""
        return re.sub(r'[^a-zA-Z0-9]+', '-', name.lower()).strip('-')
    
    def add_missing_organizations(self, component_data, scraped_orgs):
        """Add organizations from our target list that weren't found on the page"""
        scraped_names = set()
        
        # Collect all scraped organization names
        for category in ['national', 'international']:
            for org in scraped_orgs.get(category, []):
                scraped_names.add(org.get('matched_name', org['name']))
        
        # Add missing national organizations
        for org_name in self.target_organizations['national']:
            if org_name not in scraped_names:
                component_data['national'].append({
                    'id': self.generate_id(org_name),
                    'name': org_name,
                    'link': '#',
                    'logo': None,
                    'scraped_name': None
                })
        
        # Add missing international organizations
        for org_name in self.target_organizations['international']:
            if org_name not in scraped_names:
                component_data['international'].append({
                    'id': self.generate_id(org_name),
                    'name': org_name,
                    'link': '#',
                    'logo': None,
                    'scraped_name': None
                })
    
    def save_results(self, organizations, output_file='organizations_data.json'):
        """Save scraped organization data to JSON file"""
        output_path = Path(output_file)
        
        # Generate React component data
        component_data = self.generate_react_component_data(organizations)
        
        # Create comprehensive output
        output_data = {
            'scraped_data': organizations,
            'component_data': component_data,
            'scrape_timestamp': time.time(),
            'source_url': 'https://nekib.helsekompetanse.no/for-helsepersonell/organisasjoner/'
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Saved organization data to {output_path}")
        return output_data

def main():
    scraper = OrganizationScraper()
    
    # Scrape the NEKIB organizations page
    url = 'https://nekib.helsekompetanse.no/for-helsepersonell/organisasjoner/'
    organizations = scraper.scrape_organizations_page(url)
    
    if organizations:
        # Save results
        output_data = scraper.save_results(organizations)
        
        # Print summary
        logger.info("Scraping completed successfully!")
        logger.info(f"Found {len(organizations['national'])} national organizations")
        logger.info(f"Found {len(organizations['international'])} international organizations")
        logger.info(f"Found {len(organizations['unmatched'])} unmatched organizations")
        
        # Print component data summary
        component_data = output_data['component_data']
        print("\n=== COMPONENT DATA SUMMARY ===")
        print(f"National organizations: {len(component_data['national'])}")
        for org in component_data['national']:
            print(f"  - {org['name']} -> {org['link']}")
        
        print(f"\nInternational organizations: {len(component_data['international'])}")
        for org in component_data['international']:
            print(f"  - {org['name']} -> {org['link']}")
        
        return output_data
    else:
        logger.error("Failed to scrape organizations")
        return None

if __name__ == "__main__":
    main()
