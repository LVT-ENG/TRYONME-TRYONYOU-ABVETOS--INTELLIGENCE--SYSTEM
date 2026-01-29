from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to app
    print("Navigating to Home...")
    page.goto("http://localhost:5173")

    # Check Landing
    print("Checking Landing Page...")
    expect(page.get_by_text("GALERIES LAFAYETTE")).to_be_visible()

    # Click Start
    print("Starting Journey...")
    page.get_by_text("CLIQUEZ POUR COMMENCER").click()

    # Wait for Scan Phase (DOM Text)
    print("Waiting for Scan Mode...")
    expect(page.get_by_text("ANALYSE BIOMÉTRIQUE")).to_be_visible()

    # Wait for Result / Snap (Trend Context text is on CANVAS, so we can't check it easily via DOM)
    # But "TOTAL LOOK CONFIRMÉ" is in the DOM header for result mode.
    print("Waiting for Result Mode...")
    expect(page.get_by_text("TOTAL LOOK CONFIRMÉ")).to_be_visible(timeout=15000)

    # Check Buy Button
    print("Checking Buy Button...")
    buy_btn = page.get_by_role("button", name="COMPRAR LOOK TOTAL")
    expect(buy_btn).to_be_visible()

    # Click Buy Button and check QR Modal
    print("Clicking Buy Button...")
    buy_btn.click()
    expect(page.get_by_text("LOCALIZACIÓN TIENDA")).to_be_visible()

    # Screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/ultimatum_success.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
