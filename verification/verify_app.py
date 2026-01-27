from playwright.sync_api import sync_playwright, expect

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173")
            expect(page).to_have_title("Galeries Lafayette - Divineo Pilot")

            page.wait_for_timeout(2000)

            expect(page.get_by_text("Galeries Lafayette")).to_be_visible()

            page.screenshot(path="verification/app_screenshot.png")
            print("Verification successful")

        except Exception as e:
            page.screenshot(path="verification/failure.png")
            print(f"Verification failed: {e}")
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app()
