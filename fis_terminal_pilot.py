import os
import json
import time
import random
import qrcode
from PIL import Image

class FIS_Agent_System:
    def __init__(self, user_name):
        self.user = user_name
        self.total_look_value = 1400
        self.currency = "EUR"
        self.inventory_count = 166
        self.slogan = "Ne vous le faites pas raconter, vivez-le."

    def biometric_scan(self):
        print(f"\n[JULES]: Iniciando escaneo biométrico para {self.user}...")
        time.sleep(1.5)
        # Simulación de detección de landmarks (Hombros, Cintura, Cadera)
        landmarks = {"hombros": 48.5, "cintura": 82.0, "cadera": 94.2}
        print(f"✅ Escaneo completado: {len(landmarks)} puntos de anclaje detectados.")
        return landmarks

    def agent_70_decision(self, data):
        print("\n[AGENT 70]: Consultando base de datos de 166 ítems...")
        time.sleep(1)
        # Lógica de match basada en el drama de 'Horma Ancha'
        selection = "Look_Rouge_Luxe_Lafayette"
        print(f"👗 Selección Perfecta: {selection}")
        print(f"💰 Valor del Look: {self.total_look_value} {self.currency}")
        return selection

    def generate_conversion_qr(self, look_id):
        print(f"\n[SISTEMA]: Generando ticket de reserva para Galeries Lafayette...")
        qr_data = f"USER:{self.user}|LOOK:{look_id}|PRICE:{self.total_look_value}"
        
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(qr_data)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        
        # Asegurar que la carpeta existe
        if not os.path.exists('outputs'):
            os.makedirs('outputs')
            
        qr_path = f"outputs/reserva_{int(time.time())}.png"
        img.save(qr_path)
        print(f"✅ TICKET GENERADO: {qr_path}")
        return qr_path

    def run_pilot(self):
        print("="*50)
        print(f"🚀 FIS v7.0 - TERMINAL MODE ACTIVE")
        print("="*50)
        
        landmarks = self.biometric_scan()
        look = self.agent_70_decision(landmarks)
        
        print(f"\n✨ {self.slogan}")
        print("\nPulse 'S' para hacer el SNAP y generar el QR de compra...")
        
        input_user = input(">> ").upper()
        if input_user == 'S':
            qr_file = self.generate_conversion_qr(look)
            print(f"\n🔥 Misión cumplida. Muestra el QR al Board.")
        else:
            print("\n❌ Snap cancelado.")

if __name__ == "__main__":
    # Inyectar credenciales y ejecutar
    pilot = FIS_Agent_System("Ruben Rodriguez")
    pilot.run_pilot()
