import os
import sys

# --- SIMULACIÓN DE IMPORTACIONES DE TUS ARCHIVOS ---
# Esto permite que el código corra incluso si los archivos no están en la misma carpeta aún
try:
    import genesis_commander as genesis
    import fix_lafayette as lafayette
    MODULOS_DISPONIBLES = True
except ImportError:
    MODULOS_DISPONIBLES = False

class TryOnYouPiloto:
    def __init__(self):
        self.version = "1.0.0"
        self.nombre_proyecto = "TryOnYou Training Pilot"

    def limpiar_pantalla(self):
        os.system('cls' if os.name == 'nt' else 'clear')

    def ejecutar_genesis(self):
        print("\n[MÓDULO] Ejecutando Genesis Commander...")
        if MODULOS_DISPONIBLES:
            # Aquí llamamos a la función principal de tu archivo genesis_commander.py
            # genesis.main() 
            print("> Ejecutando lógica real de Genesis...")
        else:
            print("> [AVISO] Archivo genesis_commander.py no encontrado. Usando modo simulación.")

    def ejecutar_lafayette(self):
        print("\n[MÓDULO] Ejecutando Correcciones Lafayette...")
        if MODULOS_DISPONIBLES:
            # lafayette.corregir()
            print("> Ejecutando lógica real de Lafayette...")
        else:
            print("> [AVISO] Archivo fix_lafayette.py no encontrado. Usando modo simulación.")

    def menu_principal(self):
        while True:
            self.limpiar_pantalla()
            print(f"======================================")
            print(f"   {self.nombre_proyecto.upper()}")
            print(f"   Versión: {self.version}")
            print(f"======================================")
            print("1. Iniciar Entrenamiento Completo (All-in-one)")
            print("2. Ejecutar Genesis Commander")
            print("3. Ejecutar Fix Lafayette")
            print("4. Salir")
            print("--------------------------------------")
            
            opcion = input("Seleccione una opción: ")

            if opcion == "1":
                self.ejecutar_lafayette()
                self.ejecutar_genesis()
                input("\nPresiona Enter para volver al menú...")
            elif opcion == "2":
                self.ejecutar_genesis()
                input("\nPresiona Enter para volver al menú...")
            elif opcion == "3":
                self.ejecutar_lafayette()
                input("\nPresiona Enter para volver al menú...")
            elif opcion == "4":
                print("Cerrando piloto...")
                break
            else:
                print("Opción no válida.")

def ejecutar():
    """Función principal para ejecutar el piloto TryOnYou."""
    piloto = TryOnYouPiloto()
    piloto.menu_principal()

if __name__ == "__main__":
    ejecutar()
