# Lista completa de documentos relevantes para el proyecto
documentos_finalizacion_proyecto = [
    {
        "titulo": "tryonyou notas proyecto.pdf",
        "descripcion": "Documento con la 'columna vertebral definitiva' del proyecto, incluyendo visión, módulos principales (avatar3D.js, comparadorTextil.js, etc.) y el circuito de venta en 9 pasos.",
        "enlace": "https://drive.google.com/open?id=1MC5yhP--5h8iqIcmhmAPH-6HxyMRv6p8"
    },
    {
        "titulo": "ESTRUCTURA DEL PROYECTO.txt",
        "descripcion": "Archivo de texto con la estructura y organización del proyecto.",
        "enlace": "https://drive.google.com/open?id=19zmltl-B2xLTdgcERURNVt9tlobMFslv"
    },
    {
        "titulo": "TRYONYOU_PILOT_COMPLETE.zip",
        "descripcion": "Archivo ZIP que contiene la versión completa del piloto del proyecto TRYONYOU.",
        "enlace": "https://drive.google.com/open?id=190e_OK5aEM25IxIFNWHjQoLGtqQc_lUg"
    },
    {
        "titulo": "TRYONYOU_COMPLETE_PROJECT.zip",
        "descripcion": "Archivo ZIP de la compilación final del proyecto completo.",
        "enlace": "https://drive.google.com/open?id=1wTi28RQvyr5yFue9ggwsJl_qpllZmxIQ"
    },
    {
        "titulo": "TRYONYOU_4_ESPECIFICACIONES.zip",
        "descripcion": "Archivo ZIP con las especificaciones técnicas detalladas del proyecto.",
        "enlace": "https://drive.google.com/open?id=1FHLLEwRW-bNMg0YJxjBRixBQLLPxNH1N"
    }
]

# Ejemplo de cómo acceder y usar la lista
print("Documentos encontrados para la finalización del proyecto:")
for doc in documentos_finalizacion_proyecto:
    print(f"- Título: {doc['titulo']}")
    print(f"  Descripción: {doc['descripcion']}")
    print(f"  Enlace: {doc['enlace']}\n")

# Para enviar a Jules, puedes serializar esta lista (por ejemplo, a JSON) o compartir el script directamente.
# import json
# datos_json = json.dumps(documentos_finalizacion_proyecto, indent=4)
# print(datos_json)
