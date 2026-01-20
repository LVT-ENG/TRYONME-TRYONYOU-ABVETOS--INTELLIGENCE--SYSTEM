from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Check Home
        print("Navigating to Home...")
        page.goto("http://localhost:3000")
        page.wait_for_selector("text=Virtual")
        page.screenshot(path="verification/1_home.png")
        print("Home screenshot taken.")

        # 2. Check Pilot (if accessible)
        print("Navigating to Pilot...")
        page.goto("http://localhost:3000/pilot")
        # Pilot might need camera, so it might block or show permissions.
        # We just want to see if it loads.
        try:
            page.wait_for_timeout(2000) # Wait a bit
            page.screenshot(path="verification/2_pilot.png")
            print("Pilot screenshot taken.")
        except Exception as e:
            print(f"Pilot check failed: {e}")

        # 3. Check Asset Loading
        print("Checking Asset: red_dress_minimal.png")
        response = page.goto("http://localhost:3000/assets/catalog/red_dress_minimal.png")
        if response.status == 200:
            print("Asset loaded successfully.")
            page.screenshot(path="verification/3_asset_check.png")
        else:
            print(f"Asset failed to load: {response.status}")

        browser.close()

if __name__ == "__main__":
    run()
