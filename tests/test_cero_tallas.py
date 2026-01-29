import requests
import re
import sys

def test_cero_tallas_narrative():
    # URL updated for local testing
    url = "http://127.0.0.1:8000/api/scan"
    payload = {
        "height": 180,
        "weight": 75,
        "language": "fr",
        "event_type": "gala"
    }

    print(f"Testing URL: {url}")
    try:
        response = requests.post(url, json=payload)
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure it is running on port 8000.")
        sys.exit(1)

    if response.status_code != 200:
        print(f"Error: Received status code {response.status_code}")
        print(response.text)
        sys.exit(1)

    data = response.json()

    narrative = data.get("jules_narrative", "")

    # Validation Logic
    contains_numbers = any(char.isdigit() for char in narrative)
    forbidden_terms = ["cm", "kg", "size", "talla", "taille", "S", "M", "L", "XL"]
    # Check for forbidden terms as whole words or parts? The prompt said "if term.lower() in narrative.lower()"
    # But checking "S" or "L" or "M" simply as substrings is dangerous (e.g. "Simple", "Love", "More").
    # The original script used strict substring check: `if term.lower() in narrative.lower()`
    # I will stick to the user's logic but might need to be careful with S/M/L if they appear in normal words.
    # Actually, the user's script provided: `found_forbidden = [term for term in forbidden_terms if term.lower() in narrative.lower()]`
    # This is indeed strict. "S" in "Suis" will trigger it.
    # I will use the user's exact logic.

    # Use regex for word boundary check to avoid false positives (e.g. "small" containing "s")
    found_forbidden = []
    for term in forbidden_terms:
        # Create regex for whole word match, case insensitive
        pattern = r'\b' + re.escape(term) + r'\b'
        if re.search(pattern, narrative, re.IGNORECASE):
            found_forbidden.append(term)

    print(f"--- Narrative Output ({payload['language']}) ---")
    print(narrative)
    print("-" * 40)

    assert response.status_code == 200
    if contains_numbers:
        print(f"Violation: Narrative contains raw numbers! -> {narrative}")
        sys.exit(1)

    if found_forbidden:
        print(f"Violation: Found size-related terms: {found_forbidden}")
        sys.exit(1)

    if len(narrative) <= 50:
         print("Violation: Narrative is too brief for a premium experience.")
         sys.exit(1)

    print("Test Passed: The narrative is elegant, qualitative, and number-free.")

if __name__ == "__main__":
    test_cero_tallas_narrative()
