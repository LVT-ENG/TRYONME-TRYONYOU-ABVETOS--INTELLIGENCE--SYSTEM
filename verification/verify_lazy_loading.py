
from playwright.sync_api import sync_playwright, expect
import time

def verify_lazy_loading():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to Landing Page...")
        # Start tracking network requests
        requests = []
        page.on("request", lambda request: requests.append(request.url))

        try:
            page.goto("http://localhost:5173", timeout=30000)

            # Wait for landing page to settle
            page.wait_for_load_state("networkidle")

            # Check that Demo chunk is NOT loaded yet
            demo_loaded = any("Demo" in url for url in requests)
            print(f"Demo chunk loaded on landing page: {demo_loaded}")

            if demo_loaded:
                print("FAILURE: Demo chunk should NOT be loaded on Landing Page")
            else:
                print("SUCCESS: Demo chunk NOT loaded on Landing Page")

            # Take screenshot of Landing Page
            page.screenshot(path="verification/landing_page.png")

            # Clear requests
            requests.clear()

            print("Navigating to Demo Page...")
            # Click "ENTER PILOT" button which goes to /demo
            page.get_by_text("ENTER PILOT").click()

            # Wait for Demo page to load
            expect(page.get_by_text("Complete Look Builder")).to_be_visible(timeout=10000)

            # Check that Demo chunk IS loaded now
            demo_chunk_loaded = any("Demo" in url for url in requests) or \
                                any("chunk" in url for url in requests) # chunk names might vary in dev

            print(f"New chunks loaded: {[r for r in requests if 'chunk' in r or 'Demo' in r]}")

            # Take screenshot of Demo Page
            page.screenshot(path="verification/demo_page.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_lazy_loading()
