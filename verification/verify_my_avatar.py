import os
from playwright.sync_api import sync_playwright

def verify_my_avatar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to My Avatar page
        page.goto("http://localhost:4173/my-avatar")

        # Wait for content to load
        page.wait_for_selector("text=What's your body type?")

        # Take screenshot of Step 1
        os.makedirs("verification", exist_ok=True)
        page.screenshot(path="verification/my_avatar_step1.png")
        print("Screenshot of Step 1 saved.")

        # Click on 'Athletic' body type
        page.click("text=Athletic")

        # Click Next
        page.click("button:has-text('Next Step')")

        # Wait for Step 2
        page.wait_for_selector("text=Your Measurements")

        # Take screenshot of Step 2
        page.screenshot(path="verification/my_avatar_step2.png")
        print("Screenshot of Step 2 saved.")

        browser.close()

if __name__ == "__main__":
    verify_my_avatar()
