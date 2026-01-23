
from playwright.sync_api import sync_playwright

def verify_pilot_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            print("Navigating to Home...")
            page.goto("http://localhost:3000/")
            page.wait_for_load_state("networkidle")
            
            # Screenshot Home
            page.screenshot(path="verification/1_home.png")
            print("Screenshot saved: verification/1_home.png")

            print("Clicking 'Start Experience'...")
            # Click the button that navigates to /pilot
            page.get_by_role("button", name="Start Experience").click()
            page.wait_for_url("**/pilot")
            page.wait_for_load_state("networkidle")
            
            # Screenshot Pilot
            page.screenshot(path="verification/2_pilot.png")
            print("Screenshot saved: verification/2_pilot.png")
            
            # Fill out form
            print("Filling out Pilot form...")
            # We assume default values are pre-filled or we just click the button
            page.get_by_role("button", name="Find My Perfect Fit").click()
            
            # Wait for processing and navigation to result
            print("Waiting for processing...")
            page.wait_for_url("**/result", timeout=10000)
            page.wait_for_load_state("networkidle")
            
            # Screenshot Result
            page.screenshot(path="verification/3_result.png")
            print("Screenshot saved: verification/3_result.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_pilot_flow()
