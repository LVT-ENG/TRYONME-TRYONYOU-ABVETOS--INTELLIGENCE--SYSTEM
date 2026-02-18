import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to demo page...")
            page.goto("http://localhost:5173/demo")

            # Wait for some content to ensure page loaded
            print("Waiting for content...")
            page.wait_for_selector("text=Precision is calibrated", timeout=10000)

            # Wait 1s for the scanning line to move down a bit
            print("Waiting for animation...")
            time.sleep(1)

            # Take screenshot
            print(" taking screenshot...")
            page.screenshot(path="verification_scanning.png")
            print("Screenshot saved to verification_scanning.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
