
from playwright.sync_api import sync_playwright

def verify_demo_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the demo page
        print("Navigating to demo page...")
        page.goto("http://localhost:4173/demo")

        # Wait for content to load
        page.wait_for_selector("text=Complete Look Builder")

        # Take a screenshot of the initial state
        print("Taking initial screenshot...")
        page.screenshot(path="verification/demo_initial.png")

        # Click on a different top (e.g., 'White Oxford Shirt')
        print("Selecting 'White Oxford Shirt'...")
        page.get_by_text("White Oxford Shirt").click()

        # Wait for potential transition
        page.wait_for_timeout(1000)

        # Take another screenshot
        print("Taking screenshot after interaction...")
        page.screenshot(path="verification/demo_interaction.png")

        browser.close()

if __name__ == "__main__":
    verify_demo_page()
