from playwright.sync_api import sync_playwright

def verify_app_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Start navigation
            page.goto("http://localhost:5173")

            # Wait for key elements to ensure page load
            page.wait_for_selector("h1") # Header

            # Take screenshot
            page.screenshot(path="verification/app_ui.png")
            print("Screenshot saved to verification/app_ui.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app_ui()
