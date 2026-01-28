import sys
import os
import unittest
import asyncio
from unittest.mock import MagicMock, patch

# Add root to path so we can import api
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import the module under test
# It will use the installed google-generativeai package
from api import index

class TestApiMock(unittest.TestCase):
    def test_recommendation_uses_new_token_field(self):
        # Setup event loop for async test
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        # Patch the genai object inside api.index
        with patch('api.index.genai') as mock_genai:
            # Setup Mock Model
            mock_model_instance = MagicMock()
            mock_genai.GenerativeModel.return_value = mock_model_instance

            # Setup Mock Response
            mock_response = MagicMock()
            # Ensure text is returned as string
            mock_response.text = '{"product_name": "Gemini Product", "jules_narrative": "Gemini Narrative", "fabric_analysis": "Gemini Analysis"}'

            # Setup usage_metadata
            mock_usage = MagicMock()
            mock_usage.total_thought_tokens = 999
            mock_response.usage_metadata = mock_usage

            mock_model_instance.generate_content.return_value = mock_response

            # Prepare Request
            req = index.RecommendationRequest(height=175, weight=65, event="gala")

            # Patch GOOGLE_API_KEY in the module to ensure it tries to use GenAI
            with patch('api.index.GOOGLE_API_KEY', 'valid_fake_key'):
                 # Call the async function
                 result = loop.run_until_complete(index.get_recommendation(req, token="valid_token"))

                 # Assertions
                 # If this fails, it means fallback logic was used
                 self.assertEqual(result['product_name'], "Gemini Product")
                 self.assertEqual(result['jules_narrative'], "Gemini Narrative")

                 # Verify model initialization with Gemini 3 Flash
                 mock_genai.GenerativeModel.assert_called_with('gemini-3-flash')

                 print("\nTest passed: API used Gemini 3 Flash and processed response.")

if __name__ == '__main__':
    unittest.main()
