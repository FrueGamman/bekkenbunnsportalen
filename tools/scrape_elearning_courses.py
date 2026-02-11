#!/usr/bin/env python3
"""
Script to scrape e-learning courses from NEKIB website
"""

import requests
from bs4 import BeautifulSoup
import json
import re
from urllib.parse import urljoin, urlparse
import time

def scrape_elearning_courses():
    """Scrape e-learning courses from NEKIB website"""
    base_url = "https://nekib.helsekompetanse.no"
    courses_url = "https://nekib.helsekompetanse.no/for-helsepersonell/e-laeringskurs/"
    
    print(f"Scraping e-learning courses from: {courses_url}")
    
    try:
        # Get the main courses page
        response = requests.get(courses_url, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        courses = []
        
        # Look for course sections/cards
        # The courses appear to be in sections with titles and "Til kurset" links
        course_sections = soup.find_all(['section', 'div', 'article'], class_=re.compile(r'(course|kurs|content)', re.I))
        
        if not course_sections:
            # Fallback: look for any elements containing "Til kurset"
            course_sections = soup.find_all(lambda tag: tag.name and 'til kurset' in tag.get_text().lower())
            if course_sections:
                # Get parent elements that might contain the full course info
                course_sections = [section.find_parent() for section in course_sections if section.find_parent()]
        
        # Also look for headings followed by course links
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5'], string=re.compile(r'.+'))
        
        for heading in headings:
            # Look for course title and description
            title_text = heading.get_text().strip()
            
            # Skip if it's navigation or generic text
            if any(skip in title_text.lower() for skip in ['menu', 'search', 'tilstander', 'nyttig info', 'bekkenbunnsportalen']):
                continue
            
            # Look for description and link in following siblings
            description = ""
            course_link = ""
            
            # Check next siblings for description and link
            current = heading.next_sibling
            while current and len([description, course_link]) < 2:
                if hasattr(current, 'get_text'):
                    text = current.get_text().strip()
                    if text and not description and len(text) > 20:  # Likely description
                        description = text
                    
                    # Look for "Til kurset" link
                    link = current.find('a', string=re.compile(r'til kurset', re.I))
                    if link and link.get('href'):
                        course_link = urljoin(base_url, link.get('href'))
                
                current = current.next_sibling
            
            # Also check if the heading itself contains a link
            if not course_link:
                parent = heading.find_parent()
                if parent:
                    link = parent.find('a', string=re.compile(r'til kurset', re.I))
                    if link and link.get('href'):
                        course_link = urljoin(base_url, link.get('href'))
            
            if title_text and (description or course_link):
                course = {
                    'title': title_text,
                    'description': description or 'E-læringskurs fra NEKIB',
                    'link': course_link,
                    'type': 'e-learning',
                    'provider': 'NEKIB'
                }
                courses.append(course)
        
        # Manual extraction based on the provided content
        manual_courses = [
            {
                'title': 'Utredning og behandling av bekkenbunnsdysfunksjoner',
                'description': 'Dette kurset vil gi deg kunnskap om tverrfaglig og systematisk tilnærming til dysfunksjoner i bekkenbunnen med fokus på vannlatningsfunksjon, avføringsfunksjon, seksualfunksjon og smerter.',
                'link': '',  # Will need to be extracted from actual page
                'type': 'e-learning',
                'provider': 'NEKIB'
            },
            {
                'title': 'Fremfall av underlivsorganer (underlivsprolaps)',
                'description': 'E-læringkurs utarbeidet av Bekkensenteret ved Ahus.',
                'link': '',
                'type': 'e-learning',
                'provider': 'Bekkensenteret ved Ahus'
            },
            {
                'title': 'Unngå overstrekk – tøm urinblæren i tide',
                'description': 'E-læringskurs utarbeidet ved avdeling for urologi i samarbeid med avdeling for kompetanseutvikling, ved Ahus.',
                'link': '',
                'type': 'e-learning',
                'provider': 'Ahus'
            },
            {
                'title': 'Instruksjonsfilm om Avføringslekkasje',
                'description': 'Utviklet av Bekkensenteret ved Akershus universitetssykehus, Helse Sør-Øst.',
                'link': '',
                'type': 'video-course',
                'provider': 'Bekkensenteret ved Ahus'
            }
        ]
        
        # Try to find actual links for manual courses
        for manual_course in manual_courses:
            # Look for links containing parts of the title
            title_words = manual_course['title'].lower().split()[:3]  # First 3 words
            for word in title_words:
                if len(word) > 3:  # Skip short words
                    link_element = soup.find('a', string=re.compile(word, re.I))
                    if link_element and link_element.get('href'):
                        manual_course['link'] = urljoin(base_url, link_element.get('href'))
                        break
        
        # Combine scraped and manual courses, avoiding duplicates
        all_courses = courses.copy()
        for manual_course in manual_courses:
            # Check if similar course already exists
            exists = any(
                manual_course['title'].lower() in existing['title'].lower() or
                existing['title'].lower() in manual_course['title'].lower()
                for existing in all_courses
            )
            if not exists:
                all_courses.append(manual_course)
        
        print(f"Found {len(all_courses)} e-learning courses")
        
        # Save to JSON file
        output_file = 'elearning_courses.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_courses, f, ensure_ascii=False, indent=2)
        
        print(f"Courses saved to {output_file}")
        
        # Print summary
        for i, course in enumerate(all_courses, 1):
            print(f"\n{i}. {course['title']}")
            print(f"   Description: {course['description'][:100]}...")
            print(f"   Link: {course['link']}")
            print(f"   Provider: {course['provider']}")
        
        return all_courses
        
    except requests.RequestException as e:
        print(f"Error fetching courses page: {e}")
        return []
    except Exception as e:
        print(f"Error parsing courses: {e}")
        return []

if __name__ == "__main__":
    courses = scrape_elearning_courses()
    print(f"\nScraping completed. Found {len(courses)} courses.")
