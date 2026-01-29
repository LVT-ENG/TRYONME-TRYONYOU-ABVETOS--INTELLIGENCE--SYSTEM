from playwright.sync_api import Page, expect, sync_playwright
import time
import os
from pathlib import Path
import argparse

def verify_landing(page: Page, app_url: str, screenshot_path: str):
    # Go to app
    print(f"Navigating to app at {app_url}...")
    page.goto(app_url)

    # Check for main title
    print("Waiting for title...")
    expect(page.get_by_text("Galeries Lafayette")).to_be_visible(timeout=15000)

    # Take screenshot
    print(f"Taking screenshot to {screenshot_path}...")
    page.screenshot(path=screenshot_path)
    print("Screenshot taken.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Verify app landing page and take a screenshot.")
    parser.add_argument(
        "--app-url",
        default=os.environ.get("APP_URL", "http://localhost:5173"),
        help="Base URL of the app to verify (default: %(default)s or $APP_URL).",
    )
    parser.add_argument(
        "--screenshot-path",
        default=os.environ.get("SCREENSHOT_PATH"),
        help="Path to save the screenshot (default: repo-relative verification/verification.png or $SCREENSHOT_PATH).",
    )
    args = parser.parse_args()

    # Determine screenshot path, defaulting to a path relative to this file if none is provided.
    if args.screenshot_path:
        screenshot_path = args.screenshot_path
    else:
        base_dir = Path(__file__).resolve().parent
        screenshots_dir = base_dir / "verification"
        screenshots_dir.mkdir(parents=True, exist_ok=True)
        screenshot_path = str(screenshots_dir / "verification.png")

    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_landing(page, args.app_url, screenshot_path)
            print("Verification Successful")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
