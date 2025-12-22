import google.generativeai as genai
import os
import time

def check_ai_gateway_health():
    """
    Validates connectivity with the Paid Gemini API (AI Gateway).
    """
    try:
        # Configure API key from environment variable
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        
        start_time = time.time()
        # Initialize model for a quick health check
        model = genai.GenerativeModel('gemini-1.5-flash')
        # Minimal request to verify API Key and quota
        model.generate_content("health_check") 
        latency = round((time.time() - start_time) * 1000, 2)
        return {"status": "Operational", "latency_ms": latency}
    except Exception as e:
        return {"status": "Degraded", "error": str(e)}
