
def analizar_tendencias_google():
    top_20 = ["cuello mao", "bombachos", "rojo burdeos", "cuello mao", "bombachos", "cuello mao"]
    return [p for p in set(top_20) if top_20.count(p) >= 3]

def crear_total_look(prenda_base, evento, sitio):
    tendencias = analizar_tendencias_google()
    return {
        "look": f"Completo con {prenda_base}",
        "detalles": tendencias,
        "accesorios": ["pendientes", "bolso", "zapatos"]
    }
