def aplicar_estilismo_dinamico(genero, evento):
    perfiles = {
        "hombre": {"prenda": "Chaqueta Gala", "fisica": "Estructurada", "ajuste": "Hombros"},
        "mujer": {"prenda": "Vestido Seda", "fisica": "Fluida", "ajuste": "Cintura/Caída"}
    }
    seleccion = perfiles.get(genero.lower())
    print(f"SIMULACIÓN: Proyectando {seleccion['prenda']} con física {seleccion['fisica']} sobre el usuario.")
    return seleccion
