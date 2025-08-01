#!/usr/bin/env python3
"""
Script to download quotes from quotable.io and convert to Firestore format
"""

import json
import requests
from datetime import datetime

def download_quotes(limit=500):
    """Download quotes from quotable.io"""
    url = f"https://api.quotable.io/quotes?limit={limit}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error downloading quotes: {e}")
        return None

def convert_to_firestore_format(quotes_data):
    """Convert quotes to Firestore format"""
    firestore_quotes = []
    
    for quote in quotes_data.get('results', []):
        firestore_quote = {
            'text': quote.get('content', ''),
            'author': quote.get('author', ''),
            'ko': '',  # Empty Korean translation field
            'tags': quote.get('tags', []),
            'createdAt': datetime.now().isoformat()
        }
        firestore_quotes.append(firestore_quote)
    
    return firestore_quotes

def save_to_json(quotes, filename='quotes_firestore.json'):
    """Save quotes to JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(quotes, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(quotes)} quotes to {filename}")

def main():
    print("Downloading quotes from quotable.io...")
    quotes_data = download_quotes(500)
    
    if quotes_data:
        print(f"Downloaded {len(quotes_data.get('results', []))} quotes")
        
        firestore_quotes = convert_to_firestore_format(quotes_data)
        save_to_json(firestore_quotes)
        
        print("Conversion completed successfully!")
        print("\nNext steps:")
        print("1. Upload quotes_firestore.json to your Firebase project")
        print("2. Use Firebase Admin SDK to import the data")
        print("3. Or use gcloud firestore import command")
    else:
        print("Failed to download quotes")

if __name__ == "__main__":
    main() 