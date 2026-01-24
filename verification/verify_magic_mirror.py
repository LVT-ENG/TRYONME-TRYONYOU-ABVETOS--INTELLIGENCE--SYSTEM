from playwright.sync_api import sync_playwright

def test_magic_mirror(page):
    page.goto("http://localhost:5173")
    # Wait for the landing page to load
    page.wait_for_selector("text=GALERIES LAFAYETTE")

    # Click "ACCÉDER À LA DEMO" to go to scanner view where MagicMirror is active
    page.get_by_role("button", name="ACCÉDER À LA DEMO").click()

    # Wait for scanner view
    page.wait_for_selector("text=SCAN EN COURS")

    # Take a screenshot
    page.screenshot(path="verification/magic_mirror_test.png")
    print("Screenshot saved to verification/magic_mirror_test.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_magic_mirror(page)
        except Exception as e:
            print(f"Test failed: {e}")
        finally:
            browser.close()
