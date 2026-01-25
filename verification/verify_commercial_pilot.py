from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_pilot_ui(page: Page):
    print("Navigating to Home...")
    page.goto("http://localhost:5173")

    # Check Landing
    print("Checking Landing Page...")
    expect(page.get_by_text("GALERIES LAFAYETTE")).to_be_visible()
    expect(page.get_by_text("EXPERIENCE DIVINEO BY JULES")).to_be_visible()

    # Click to start
    print("Clicking Start...")
    page.get_by_text("CLIQUEZ POUR COMMENCER").click()

    # Check Scan Page
    print("Checking Scan Page...")
    expect(page.get_by_text("MIROIR BIOMÉTRIQUE ACTIF")).to_be_visible()
    expect(page.get_by_role("button", name="OBTENIR MA COUPE PARFAITE")).to_be_visible()

    # Take screenshot of Scan Page
    time.sleep(2) # Wait for canvas/webcam init attempt
    page.screenshot(path="verification/pilot_scan_ui.png")

    # Handle Alert (since no landmarks)
    def handle_dialog(dialog):
        print(f"Alert displayed: {dialog.message}")
        dialog.dismiss()

    page.on("dialog", handle_dialog)

    # Click button
    print("Clicking Scan Button (expecting alert)...")
    page.get_by_role("button", name="OBTENIR MA COUPE PARFAITE").click()

    # Wait a bit to ensure alert handler ran
    time.sleep(1)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_pilot_ui(page)
        finally:
            browser.close()
