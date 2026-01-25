import os
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Mock the API call
    def handle_route(route):
        print("Intercepted API call")
        route.fulfill(
            status=200,
            content_type="application/json",
            body='{"status":"success", "match":"Manteau_Imperial_01", "physics":"Tension_Index_0.1234", "narrative":"Ajuste perfecto."}'
        )

    page.route("**/api/v1/internal/calculate", handle_route)

    # 1. Landing
    print("Navigating to landing page...")
    page.goto("http://localhost:5173")

    # Check Header
    expect(page.get_by_role("heading", name="GALERIES LAFAYETTE")).to_be_visible()

    # Screenshot Landing
    page.screenshot(path="verification/landing.png")
    print("Landing screenshot taken.")

    # 2. Click Video Snap
    print("Clicking Video Snap...")
    # The text is inside a p tag. get_by_text should find it.
    page.get_by_text("[ VIDEO PAU SNAP ]").click()

    # 3. Verify Scan Screen
    # The text might be appearing after animation? It's static in React logic, but CSS animation 'pulse' is there.
    expect(page.get_by_text("ANALYSE EN COURS...")).to_be_visible()
    page.screenshot(path="verification/scan.png")
    print("Scan screenshot taken.")

    # 4. Handle Alert and Click Discover
    dialog_message = []
    def handle_dialog(d):
        print(f"Dialog opened: {d.message}")
        dialog_message.append(d.message)
        d.accept()

    page.on("dialog", handle_dialog)

    print("Clicking Discover Button...")
    # Button text
    page.get_by_role("button", name="DÉCOUVRIR MA SÉLECTION PERSONNALISÉE").click()

    # Wait for the async operation (fetch) and the subsequent alert
    # Since we mock it, it should be fast, but we need to wait for the event loop.
    page.wait_for_timeout(2000)

    # Verify Alert content
    if dialog_message:
        print(f"Alert message verified.")
        assert "Manteau_Imperial_01" in dialog_message[0]
    else:
        print("No alert received!")
        # Check if button text changed to TRAITEMENT...
        # page.screenshot(path="verification/error_debug.png")
        raise Exception("Alert not received")

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
