from playwright.sync_api import sync_playwright

def verify_routing():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Go to Home
            print("Navigating to Home...")
            page.goto("http://localhost:5173/")
            page.wait_for_selector("text=L'Intelligence Sur Mesure", timeout=10000)
            print("Home page loaded.")

            # Click button
            print("Clicking 'Lancer l'Expérience'...")
            page.get_by_role("button", name="Lancer l'Expérience").click()

            # Wait for navigation
            page.wait_for_url("**/demo", timeout=10000)
            print("Navigated to /demo.")

            # Verify Demo page content
            page.wait_for_selector("text=Complete Look Builder", timeout=10000)

            # Screenshot
            page.screenshot(path="verification/demo_page.png")
            print("Screenshot saved to verification/demo_page.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_routing()
