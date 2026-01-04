import time

def run_scan(callback):
    """
    Simula un proceso real sin usar loops infinitos de JS.
    """
    stages = [25, 50, 75, 100]
    for stage in stages:
        callback(stage)
        time.sleep(0.1) # Simulación controlada
    return True
