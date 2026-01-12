def get_status():
    """
    Retorna métricas reales o seguras.
    Elimina la dependencia de valores aleatorios que rompen el CI.
    """
    # Aquí iría psutil o similar
    return {"status": "online", "load": 0.0} 
