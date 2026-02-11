# tools/scrape_constipation_pages.py
import json
import sys
from dataclasses import dataclass, asdict
from typing import List, Dict
import requests
from bs4 import BeautifulSoup

@dataclass
class LinkItem:
    text: str
    url: str

@dataclass
class Section:
    heading: str
    paragraphs: List[str]
    links: List[LinkItem]

@dataclass
class PageContent:
    source_url: str
    title: str
    sections: List[Section]

URLS = {
    "konservative_tiltak": "https://nekib.helsekompetanse.no/tommingsproblemer-og-forstoppelse-for-avforing/behandling/konservative-tiltak/",
    "kirurgisk_behandling": "https://nekib.helsekompetanse.no/tommingsproblemer-og-forstoppelse-for-avforing/behandling/kirurgisk-behandling/",
    "mestring": "https://nekib.helsekompetanse.no/tommingsproblemer-og-forstoppelse-for-avforing/mestring/",
}

HEADERS = {
    "User-Agent": "pelvic-react-content-scraper/1.0 (+https://bekkenbunnsportalen.no)"
}


def fetch(url: str) -> BeautifulSoup:
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")


def extract_page(url: str) -> PageContent:
    soup = fetch(url)
    # Title
    title_tag = soup.find(["h1", "title"]) or soup.find("h1")
    title = title_tag.get_text(strip=True) if title_tag else ""

    # Use content area if present, else body
    content_root = soup.find("main") or soup.find("article") or soup.body

    # Build sections by headings h2/h3
    sections: List[Section] = []
    if not content_root:
        return PageContent(source_url=url, title=title, sections=[])

    # Collect elements in order and break into sections on h2/h3
    current: Section = Section(heading=title or "Intro", paragraphs=[], links=[])

    def flush_current():
        nonlocal current
        if current.paragraphs or current.links or current.heading:
            sections.append(current)
        current = Section(heading="", paragraphs=[], links=[])

    for el in content_root.find_all(["h2", "h3", "p", "ul", "ol", "a"], recursive=True):
        name = el.name
        if name in ("h2", "h3"):
            # new section
            if current.heading or current.paragraphs or current.links:
                flush_current()
            current.heading = el.get_text(strip=True)
        elif name == "p":
            text = el.get_text(" ", strip=True)
            if text:
                current.paragraphs.append(text)
            # capture links in paragraph
            for a in el.find_all("a"):
                href = a.get("href") or ""
                text = a.get_text(strip=True)
                if href and text:
                    current.links.append(LinkItem(text=text, url=href))
        elif name in ("ul", "ol"):
            for li in el.find_all("li"):
                text = li.get_text(" ", strip=True)
                if text:
                    current.paragraphs.append(f"- {text}")
                for a in li.find_all("a"):
                    href = a.get("href") or ""
                    t = a.get_text(strip=True)
                    if href and t:
                        current.links.append(LinkItem(text=t, url=href))
        elif name == "a":
            href = el.get("href") or ""
            text = el.get_text(strip=True)
            if href and text:
                current.links.append(LinkItem(text=text, url=href))

    # flush last
    flush_current()

    return PageContent(source_url=url, title=title, sections=sections)


def main():
    out: Dict[str, Dict] = {}
    for key, url in URLS.items():
        try:
            page = extract_page(url)
            out[key] = asdict(page)
            print(f"Scraped {key} from {url} -> {len(page.sections)} sections")
        except Exception as e:
            print(f"Error scraping {url}: {e}", file=sys.stderr)
    with open("tools/constipation_pages.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("Wrote tools/constipation_pages.json")


if __name__ == "__main__":
    main()
