#!/usr/bin/env python3
"""
Export mapping between old and new pages for content migration.
Only includes mappings with score >= 0.6.
"""

import json
import pandas as pd
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def export_mapping():
    """Export page mappings for content migration"""
    data_dir = Path('.')
    content_audit_file = data_dir / 'content_audit.csv'
    
    if not content_audit_file.exists():
        logger.error("content_audit.csv not found. Run compare.py first.")
        return
    
    # Load content audit data
    df = pd.read_csv(content_audit_file)
    
    # Filter for pages with good matches (score >= 0.6)
    good_matches = df[
        (df['type'] == 'page') & 
        (df['match_score'] >= 0.6) & 
        (df['status'].isin(['matched', 'low_similarity']))
    ].copy()
    
    # Create mapping structure
    mappings = []
    for _, row in good_matches.iterrows():
        mapping = {
            'old': row['page_old'],
            'new': row['page_new'],
            'score': float(row['match_score']),
            'status': row['status'],
            'old_title': row['old_title'],
            'new_title': row['new_title'],
            'notes': row['notes']
        }
        mappings.append(mapping)
    
    # Sort by score (highest first)
    mappings.sort(key=lambda x: x['score'], reverse=True)
    
    # Save mapping
    mapping_file = data_dir / 'mapping.json'
    with open(mapping_file, 'w', encoding='utf-8') as f:
        json.dump(mappings, f, indent=2, ensure_ascii=False)
    
    logger.info(f"Exported {len(mappings)} page mappings to {mapping_file}")
    
    # Generate statistics
    stats = {
        'total_mappings': len(mappings),
        'high_confidence': len([m for m in mappings if m['score'] >= 0.8]),
        'medium_confidence': len([m for m in mappings if 0.6 <= m['score'] < 0.8]),
        'avg_score': sum(m['score'] for m in mappings) / len(mappings) if mappings else 0
    }
    
    logger.info(f"Mapping statistics: {stats}")
    
    # Save statistics
    stats_file = data_dir / 'mapping_stats.json'
    with open(stats_file, 'w') as f:
        json.dump(stats, f, indent=2)
    
    return mappings

def main():
    mappings = export_mapping()
    if mappings:
        logger.info("Mapping export completed successfully!")
    else:
        logger.warning("No mappings exported. Check your content audit data.")

if __name__ == "__main__":
    main()
