from playwright.sync_api import sync_playwright, expect
import time

def verify_ultimatum_flow():
    with sync_playwright() as p:
        # Launch with fake media stream to simulate webcam
        browser = p.chromium.launch(
            headless=True,
            args=['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
        )
        context = browser.new_context(
            permissions=['camera'],
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()

        print("Navigating to Home...")
        try:
            page.goto("http://localhost:5173")
        except:
            print("Retrying navigation...")
            time.sleep(2)
            page.goto("http://localhost:5173")

        # 1. Landing Page
        print("Checking Landing Page...")
        expect(page.get_by_text("GALERIES LAFAYETTE")).to_be_visible()

        # Click Access
        print("Clicking Access...")
        page.get_by_text("ACCÉDER À LA DEMO").click()

        # 2. Scanner Page
        print("Checking Scanner Page...")
        expect(page.get_by_text("SCAN EN COURS...")).to_be_visible()

        # Wait a bit for "scanning" visual
        time.sleep(2)

        # Click Next
        print("Clicking Next...")
        page.get_by_text("SUIVANT").click()

        # 3. Form Page (Zero Size)
        print("Checking Form Page...")
        expect(page.get_by_text("VOTRE STYLE")).to_be_visible()

        # Select Occasion and Preference
        print("Selecting options...")
        selects = page.locator("select")
        expect(selects.first).to_be_visible()

        selects.nth(0).select_option("event")
        selects.nth(1).select_option("slim")

        # Click Discover
        print("Clicking Discover...")
        page.get_by_text("DÉCOUVRIR MA SÉLECTION").click()

        # 4. Result Page
        print("Checking Result Page...")
        expect(page.get_by_text("CURATED SELECTION")).to_be_visible(timeout=10000)
        expect(page.get_by_text("Divineo Signature Blazer")).to_be_visible()
        # Use exact=True to avoid ambiguity
        expect(page.get_by_text("PERFECT", exact=True)).to_be_visible()

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/ultimatum_flow.png")
        print("Verification Complete.")

        browser.close()

if __name__ == "__main__":
    verify_ultimatum_flow()
