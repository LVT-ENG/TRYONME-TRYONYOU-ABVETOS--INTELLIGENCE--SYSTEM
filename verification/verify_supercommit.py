from playwright.sync_api import Page, expect, sync_playwright
import os

def verify_supercommit(page: Page):
    print("Navigating to home page...")
    page.goto("http://localhost:3000")

    print("Verifying page title or content...")
    # Verify main title
    expect(page.get_by_text("GALERIES LAFAYETTE").first).to_be_visible()

    # Verify "Start Experience" button
    expect(page.get_by_text("Start Experience")).to_be_visible()

    # Verify Patent string
    expect(page.get_by_text("PCT/EP2025/067317")).to_be_visible()

    print("Taking screenshot...")
    # Create verification directory if not exists
    os.makedirs("/home/jules/verification", exist_ok=True)
    page.screenshot(path="/home/jules/verification/supercommit_home.png")

    # Check if an asset loads (by navigating to it or checking network, simpler to just check if it's there via playwright request maybe, or just trust the build structure verification I did earlier).
    # I'll check if I can access one of the assets directly.
    print("Verifying asset accessibility...")
    response = page.goto("http://localhost:3000/assets/catalog/red_dress_minimal.png")
    if response.status != 200:
        raise Exception(f"Failed to load asset: {response.status}")

    print("Verification complete!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_supercommit(page)
        finally:
            browser.close()
