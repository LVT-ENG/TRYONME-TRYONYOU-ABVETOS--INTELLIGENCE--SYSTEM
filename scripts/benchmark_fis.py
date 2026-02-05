import sys
import os
import time
import random

# Add root directory to sys.path to import api
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.fis_engine import FISOrchestrator, Agent70

# Mock Agent70 to avoid external API calls during benchmark
class MockAgent70(Agent70):
    def generate_ai_narrative(self, user_vector, recommendations):
        return "Mock Narrative"

# Patch the orchestrator to use MockAgent70
class MockFISOrchestrator(FISOrchestrator):
    def __init__(self):
        super().__init__()
        self.a70 = MockAgent70()

def run_benchmark():
    orchestrator = MockFISOrchestrator()

    # Create a large synthetic inventory
    inventory_size = 20000
    synthetic_inventory = []
    print(f"Generating synthetic inventory with {inventory_size} items...")
    for i in range(inventory_size):
        price = random.uniform(10, 500)
        synthetic_inventory.append({
            "id": f"item_{i}",
            "Title": f"Item {i}",
            "Handle": f"item_{i}",
            "Variant Price": str(price), # Store as string to mimic real data
            "Image Src": "/assets/placeholder.png"
        })

    # Mock cache to avoid file reading logic in run_experience
    # We want to test the matching logic mainly, but also the pre-calculation if we put it in run_experience.
    # However, run_experience loads from file.
    # The optimization target is:
    # 1. run_experience loads file -> caches inv. (Here is where we will add pre-calc)
    # 2. match uses inv. (Here is where we use pre-calc)

    # To test the pre-calc speedup, we should simulate the flow where we call run_experience.
    # But run_experience expects a filename.
    # Let's manually populate the cache with our synthetic inventory so run_experience uses it.

    fake_filename = "synthetic_inventory.json"
    orchestrator._inventory_cache[fake_filename] = synthetic_inventory

    # User data
    user_data = {
        "chest": 90,
        "waist": 70,
        "height": 175,
        "user_id": "BENCH_USER"
    }

    print("Starting benchmark...")
    start_time = time.time()
    iterations = 50

    for _ in range(iterations):
        # We call match directly or run_experience?
        # run_experience calls match.
        # But wait, the optimization logic for pre-calculation needs to happen *once* when loading.
        # If I populate cache directly, I simulate the state *after* loading.
        # So I should manually apply the pre-calculation in the benchmark IF I want to test "after optimization" state?
        # No, I want to test the code changes.

        # If I change run_experience to pre-calc, I need to trigger that logic.
        # But run_experience only does that logic if not in cache.
        # If I put it in cache manually, I bypass the loading (and the optimization logic!).

        # So I should rely on calling run_experience.
        # The optimization will be:
        # if file in cache: return match(..., cache[file])
        # else: load file; pre-calc; cache[file] = inv; return match(...)

        # If I benchmark `match` directly, I can verify the speedup of `match` assuming pre-calc was done.
        # The overhead of pre-calc happens once. The benefit happens N times.

        # Let's benchmark `match` method directly.
        # I will pass the inventory to orchestrator.a70.match

        # Before optimization: match() parses floats every time.
        # After optimization: match() uses pre-calced floats.

        # So, for the benchmark of the "Before" state:
        # Just call match(user, inventory). It will parse floats.

        orchestrator.a70.match(orchestrator.jules.sanitize(user_data), synthetic_inventory)

    end_time = time.time()
    total_time = end_time - start_time
    avg_time = total_time / iterations

    print(f"Total time for {iterations} iterations: {total_time:.4f}s")
    print(f"Average time per iteration: {avg_time:.4f}s")

if __name__ == "__main__":
    run_benchmark()
