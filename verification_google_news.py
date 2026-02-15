from playwright.sync_api import sync_playwright
import os
import sys

def verify_google_news():
    failures = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to home page
        target_url = os.environ.get("TARGET_URL", "http://localhost:5173/")
        page.goto(target_url)

        # Wait for content to load
        page.wait_for_selector("[data-testid='google-section-title']")

        # Scroll to the Google section using the data-testid attribute
        google_section = page.locator("[data-testid='google-section']")
        google_section.scroll_into_view_if_needed()

        # Verify text using data-testid selectors for more stable tests
        gemini_card = page.locator("[data-testid='gemini-card']")
        gemini_text = "Agent 70 architecture with Gemini 2.0 Flash. Real-time (<500ms) style narratives with multimodal context."
        if gemini_card.get_by_text(gemini_text).count() > 0:
            print("SUCCESS: Gemini 2.0 text found.")
        else:
            print("FAILURE: Gemini 2.0 text NOT found.")
            failures.append("Gemini 2.0 text")

        mediapipe_card = page.locator("[data-testid='mediapipe-card']")
        mediapipe_text = "Privacy-first client-side body tracking with 33-keypoint precision. No images ever leave your device."
        if mediapipe_card.get_by_text(mediapipe_text).count() > 0:
            print("SUCCESS: MediaPipe text found.")
        else:
            print("FAILURE: MediaPipe text NOT found.")
            failures.append("MediaPipe text")

        # Take screenshot
        page.screenshot(path="verification_google_news.png", full_page=True)
        print("Screenshot saved to verification_google_news.png")

        browser.close()

    if failures:
        print(f"\nVerification failed for: {', '.join(failures)}")
        sys.exit(1)

if __name__ == "__main__":
    verify_google_news()
