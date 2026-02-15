from playwright.sync_api import sync_playwright

def verify_google_news():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to home page
        page.goto("http://localhost:5173/")

        # Wait for content to load
        page.wait_for_selector("h2:has-text('Powered by Google Cloud AI')")

        # Scroll to the Google section
        google_section = page.locator("h2:has-text('Powered by Google Cloud AI')").locator("..").locator("..")
        google_section.scroll_into_view_if_needed()

        # Verify text
        gemini_text = "Agent 70 architecture with Gemini 2.0 Flash. Real-time (<500ms) style narratives with multimodal context."
        if page.get_by_text(gemini_text).count() > 0:
            print("SUCCESS: Gemini 2.0 text found.")
        else:
            print("FAILURE: Gemini 2.0 text NOT found.")
            # Print page content for debugging if needed
            # print(page.content())

        mediapipe_text = "Privacy-first client-side body tracking with 33-keypoint precision. No images ever leave your device."
        if page.get_by_text(mediapipe_text).count() > 0:
            print("SUCCESS: MediaPipe text found.")
        else:
            print("FAILURE: MediaPipe text NOT found.")

        # Take screenshot
        page.screenshot(path="verification_google_news.png", full_page=True)
        print("Screenshot saved to verification_google_news.png")

        browser.close()

if __name__ == "__main__":
    verify_google_news()
