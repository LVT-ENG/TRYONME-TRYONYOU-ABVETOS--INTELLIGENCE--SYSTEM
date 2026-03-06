import cv2
import os

class OrchestrateurPAU:
    def __init__(self):
        self.output_name = "MANIFESTE_LE_PLUS_CEST_TOI_FINAL.mp4"
        # Orden narrativo: Del caos del retail al éxtasis del Museo en Casa
        self.playlist = [
            "hero_video.mp4",               # El inicio dorado
            "PA_U_PRESENTACION.mp4",        # ¿Quiénes somos?
            "prima_loca_510_pantalones.mp4",# El problema: El caos de las tallas
            "balmain_snap_look.mp4",        # La solución: El Chasquido (Divineo)
            "aniversario_gemelas_rosas.mp4",# La alegría: El rosa y la fiesta
            "fille_parfaite_dobermans.mp4", # La fuerza: La niña y los perros
            "loki_en_el_museo_75009.mp4",   # El lugar: Nuestro Museo en Casa
            "el_amor_intelectual_homenaje.mp4" # El cierre: La mente del artista
        ]

    def crear_gran_final(self):
        print("--- Orquestando el Manifiesto Final ---")
        clips = []
        width, height, fps = 0, 0, 0

        for video in self.playlist:
            if not os.path.exists(video):
                print(f"¡Atención! Falta el clip: {video}. Saltando...")
                continue
            
            cap = cv2.VideoCapture(video)
            if not width:
                width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                fps = cap.get(cv2.CAP_PROP_FPS)
            
            clips.append(cap)
            print(f"Clip añadido: {video}")

        # Definir el codec para el vídeo final
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(self.output_name, fourcc, fps, (width, height))

        print(f"Renderizando el gran final en {self.output_name}...")
        
        for cap in clips:
            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                # Aseguramos que el frame tenga el tamaño correcto
                frame_resized = cv2.resize(frame, (width, height))
                out.write(frame_resized)
            cap.release()

        out.release()
        print(f"\n¡BOOM! Manifiesto completado. Archivo generado: {self.output_name}")
        print("Declaración de intenciones: Sastrería, Circo y Corazón.")

if __name__ == "__main__":
    orquestador = OrchestrateurPAU()
    orquestador.crear_gran_final()
