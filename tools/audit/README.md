# Content Audit Tools

This directory contains tools for auditing and comparing content between the old portal (nekib.helsekompetanse.no) and the new portal (pelvic-react-three.vercel.app).

## Setup

1. Install Python dependencies:
```bash
pip install -r tools/audit/requirements.txt
```

## Usage

Run the complete audit pipeline:

```bash
cd tools/audit
python crawl.py && python compare.py && python export_map.py
```

### Individual Steps

1. **Crawl both sites**:
```bash
python crawl.py
```
This will:
- Crawl the old site (nekib.helsekompetanse.no)
- Crawl the new site (pelvic-react-three.vercel.app)
- Extract content, links, images, and videos
- Save results to `old_site_data.json` and `new_site_data.json`

2. **Compare content**:
```bash
python compare.py
```
This will:
- Find matching pages between old and new sites
- Calculate similarity scores using text analysis
- Identify missing content and media
- Generate `content_audit.csv` and `media_audit.csv`

3. **Export mapping**:
```bash
python export_map.py
```
This will:
- Create `mapping.json` with page mappings (score >= 0.6)
- Generate statistics in `mapping_stats.json`

## Output Files

- `old_site_data.json` - Crawled data from old site
- `new_site_data.json` - Crawled data from new site
- `content_audit.csv` - Page-by-page comparison results
- `media_audit.csv` - Media file comparison results
- `mapping.json` - Page mappings for content migration
- `audit_summary.json` - Summary statistics
- `mapping_stats.json` - Mapping statistics

## Configuration

Edit `sites.yaml` to configure:
- Site URLs
- Content selectors
- Maximum pages to crawl
- Request delays
- User agent

## Notes

- The crawler respects robots.txt and includes delays between requests
- Content extraction uses readability-lxml for clean text extraction
- Similarity scoring combines URL matching, text similarity, and title matching
- Only mappings with score >= 0.6 are included in the final mapping
