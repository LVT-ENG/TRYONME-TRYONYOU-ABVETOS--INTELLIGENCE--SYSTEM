
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            print("Navigating to home...")
            page.goto("http://localhost:5173")

            print("Taking home screenshot...")
            page.screenshot(path="verification/home_before_click.png")

            print("Clicking Google News link...")
            # Click the link "See Platform News"
            page.get_by_text("See Platform News").click()

            print("Waiting for news page...")
            page.wait_for_selector("text=Google Platform News")

            print("Taking news screenshot...")
            page.screenshot(path="verification/google_news_page.png")

            print("Checking content...")
            # Use specific selectors to avoid strict mode violations
            assert page.get_by_role("heading", name="Gemini 3 Pro").is_visible()
            assert page.get_by_role("heading", name="Veo 3.1").is_visible()
            assert page.get_by_role("heading", name="Jules").is_visible()

            print("Success!")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
