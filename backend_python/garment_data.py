# Fuente: [3] - Base de datos ficticia realista (Lafayette-like)
# Datos críticos: Elasticidad (%) y Puntuación de Caída (Drape)

GARMENT_DB = [
    {
        "id": "TS-001",
        "name": "Camiseta Técnica Lafayette",
        "category": "top",
        "measurements": {
            "chest": 98.0,  # Medida en plano (cm)
            "waist": 90.0,
            "length": 70.0
        },
        "fabric_tech": {
            "elasticity": 0.15,  # 15% de elasticidad (Spandex/Lycra mix)
            "drape_score": 0.9,  # Alta fluidez
            "rigidity": 0.1
        },
        "cut_type": "slim_fit"
    },
    {
        "id": "JK-202",
        "name": "Chaqueta Estructurada Denim",
        "category": "outerwear",
        "measurements": {
            "chest": 104.0,
            "waist": 98.0,
            "length": 65.0
        },
        "fabric_tech": {
            "elasticity": 0.02,  # 2% elasticidad (Rígido)
            "drape_score": 0.2,  # Baja fluidez, mantiene forma
            "rigidity": 0.8
        },
        "cut_type": "regular"
    }
]
