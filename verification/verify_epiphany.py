from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the app
    page.goto("http://localhost:3000")

    # Click the button
    page.click("text=🎄 Play Epiphany")

    # Wait for the epiphany protocol to appear (using a text from the first scene)
    # The first scene has "Bonjour."
    page.wait_for_selector("text=Bonjour.")

    # Wait a bit for animation
    page.wait_for_timeout(2000)

    # Take screenshot
    page.screenshot(path="verification/epiphany_screenshot.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
