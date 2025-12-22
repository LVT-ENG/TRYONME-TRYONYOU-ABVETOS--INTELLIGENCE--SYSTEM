import logging
import time
from datetime import datetime

# Configure professional logging format
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - ABVETOS_ENGINE - %(levelname)s - %(message)s',
    filename='abvetos_usage.log'
)

def log_ai_transaction(user_id, operation, tokens_used=0):
    """
    Records an AI transaction for billing and auditing.
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"User: {user_id} | Op: {operation} | Status: SUCCESS"
    logging.info(log_entry)
    print(f"[{timestamp}] Logged transaction for {user_id}")

# Middleware-style wrapper for FastAPI
def monitor_performance(func):
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        result = await func(*args, **kwargs)
        duration = time.time() - start_time
        logging.info(f"Performance: {func.__name__} took {duration:.2f} seconds")
        return result
    return wrapper
