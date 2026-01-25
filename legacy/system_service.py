import psutil, json, sys
def get_status():
    try:
        cpu = psutil.cpu_percent(interval=1)
        mem = psutil.virtual_memory().percent
        return {"status": "online", "cpu_usage": cpu, "memory_usage": mem}
    except:
        return {"status": "error", "cpu_usage": 0.0, "memory_usage": 0.0}
if __name__ == "__main__":
    print(json.dumps(get_status()))
    sys.exit(0)
