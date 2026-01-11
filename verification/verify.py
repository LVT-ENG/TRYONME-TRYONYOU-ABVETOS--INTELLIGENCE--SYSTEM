
from playwright.sync_api import sync_playwright

def verify_metadata():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Open index.html directly
        page.goto('file:///app/index.html')

        title = page.title()
        print(f'Title: {title}')

        patent_meta = page.locator('meta[name="patent-id"]').get_attribute('content')
        print(f'Patent ID: {patent_meta}')

        desc_meta = page.locator('meta[name="description"]').get_attribute('content')
        print(f'Description: {desc_meta}')

        if title == 'TRYONYOU - Powered by Google Platform' and patent_meta == 'PCT/EP2025/067317' and 'Gemini 3 Pro' in desc_meta:
            print('VERIFICATION PASSED')
            page.screenshot(path='verification/metadata.png')
        else:
            print('VERIFICATION FAILED')

        browser.close()

if __name__ == '__main__':
    verify_metadata()
