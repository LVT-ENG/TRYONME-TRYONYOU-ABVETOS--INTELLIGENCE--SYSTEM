import time
import requests
import subprocess
import sys
import os

def run_benchmark():
    # Start the server in the background
    server = subprocess.Popen(
        [sys.executable, "tryonyou_master_orchestrator.py"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    print("Waiting for server to start...")
    time.sleep(3) # Give it time to boot up

    try:
        url = "http://localhost:8000/run-full-pilot"
        print(f"Requesting {url}...")

        start_time = time.time()
        response = requests.get(url)
        end_time = time.time()

        duration = end_time - start_time

        if response.status_code == 200:
            print(f"Response: {response.json()}")
            print(f"Duration: {duration:.4f} seconds")

            # Simple assertion for baseline/optimized
            if duration > 0.9:
                print("Status: BASELINE (Slow)")
            elif duration < 0.6:
                print("Status: OPTIMIZED (Fast)")
            else:
                print("Status: UNCERTAIN")
        else:
            print(f"Error: {response.status_code}")

    except Exception as e:
        print(f"Benchmark failed: {e}")

    finally:
        print("Stopping server...")
        server.terminate()
        server.wait()

if __name__ == "__main__":
    run_benchmark()
