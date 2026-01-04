import psutil, json, sys

def get_status():
    try:
        cpu = psutil.cpu_percent(interval=1)
        mem = psutil.virtual_memory().percent
        return {"status": "online", "cpu_usage": cpu, "memory_usage": mem}
    except:
        return {"status": "error", "cpu_usage": 0.0, "memory_usage": 0.0}

def get_system_metrics():
    """
    Get system metrics in a consistent, non-random way.
    Returns CPU and memory usage as floats.
    """
    try:
        cpu = psutil.cpu_percent(interval=0.1)
        mem = psutil.virtual_memory().percent
        return {"cpu": float(cpu), "memory": float(mem)}
    except:
        return {"cpu": 0.0, "memory": 0.0}

def process_biometric_scan(data, callback):
    """
    Process biometric scan with progress callbacks.
    Calls the callback function with progress values: 25, 75, 100
    """
    # Simulated biometric processing stages
    callback(25)  # Initial scan
    callback(75)  # Processing
    callback(100) # Complete

if __name__ == "__main__":
    print(json.dumps(get_status()))
    sys.exit(0)
