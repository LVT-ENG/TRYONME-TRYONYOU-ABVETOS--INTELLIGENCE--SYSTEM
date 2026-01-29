from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_landing(page: Page):
    # Go to app
    print("Navigating to app...")
    page.goto("http://localhost:5173")

    # Check for main title
    print("Waiting for title...")
    expect(page.get_by_text("Galeries Lafayette")).to_be_visible(timeout=15000)

    # Take screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/verification.png")
    print("Screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_landing(page)
            print("Verification Successful")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
