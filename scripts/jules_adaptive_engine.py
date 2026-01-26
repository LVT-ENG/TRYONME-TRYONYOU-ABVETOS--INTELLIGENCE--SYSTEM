def aplicar_estilismo_dinamico(genero, evento):
    perfiles = {
        "hombre": {"prenda": "Chaqueta Gala", "fisica": "Estructurada", "ajuste": "Hombros"},
        "mujer": {"prenda": "Vestido Seda", "fisica": "Fluida", "ajuste": "Cintura/Caída"}
    }
    seleccion = perfiles.get(genero.lower())
    print(f"SIMULACIÓN: Proyectando {seleccion['prenda']} con física {seleccion['fisica']} sobre el usuario.")
    return seleccion

def optimizar_latencia():
    return {"buffer": "low", "tracking_precision": "high", "ar_sync": True}

def nivel_ajuste(usuario):
    if usuario == "Patrice":
        return {"modo": "TryonYou_Active", "precision": "100%", "fisica": "RealTime"}
    else:
        return {"modo": "Standard", "precision": "Estándar", "fisica": "Estática"}
