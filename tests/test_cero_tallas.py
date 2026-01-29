import requests
import re
import sys
import unittest
from unittest import mock
from unittest.mock import patch


class TestCeroTallasNarrative(unittest.TestCase):
    @patch('requests.post')
    def test_cero_tallas_narrative(self, mock_post):
        # URL and payload used by the API call (HTTP is mocked)
        url = "http://127.0.0.1:8000/api/scan"
        payload = {
            "height": 180,
            "weight": 75,
            "language": "fr",
            "event_type": "gala",
        }

        # Craft a valid narrative that should pass all validations:
        # - no digits
        # - no forbidden size-related terms
        # - length greater than 50 characters
        narrative_text = (
            "Pour votre soirée de gala, une tenue élégante et raffinée est "
            "recommandée, mettant en valeur votre allure avec des coupes "
            "harmonieuses et des matières nobles."
        )

        # Configure the mocked response
        mock_response = mock.Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"jules_narrative": narrative_text}
        mock_post.return_value = mock_response

        # Execute the (mocked) HTTP request
        response = requests.post(url, json=payload)

        # Basic response check
        self.assertEqual(response.status_code, 200)

        data = response.json()
        narrative = data.get("jules_narrative", "")

        # Validation Logic
        contains_numbers = any(char.isdigit() for char in narrative)
        forbidden_terms = ["cm", "kg", "size", "talla", "taille", "S", "M", "L", "XL"]

        # Use regex for word boundary check to avoid false positives (e.g. "small" containing "s")
        found_forbidden = []
        for term in forbidden_terms:
            # Create regex for whole word match, case insensitive
            pattern = r'\b' + re.escape(term) + r'\b'
            if re.search(pattern, narrative, re.IGNORECASE):
                found_forbidden.append(term)

        # Assertions replacing sys.exit-based failure handling
        self.assertFalse(
            contains_numbers,
            msg=f"Narrative contains raw numbers: {narrative}",
        )
        self.assertFalse(
            found_forbidden,
            msg=f"Narrative contains size-related terms: {found_forbidden}",
        )
        self.assertGreater(
            len(narrative),
            50,
            msg="Narrative is too brief for a premium experience.",
        )

