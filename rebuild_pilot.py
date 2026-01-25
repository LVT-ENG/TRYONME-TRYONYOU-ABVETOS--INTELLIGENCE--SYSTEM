#!/usr/bin/env python3
"""
REBUILD PILOT - TRYONYOU
Reconstruye y verifica la configuración del entorno piloto
Versión: 1.0.0
"""

import os
import sys
import json
from pathlib import Path

class PilotRebuilder:
    def __init__(self):
        self.root_dir = Path(__file__).parent.absolute()
        self.success_count = 0
        self.error_count = 0
        self.warnings = []
        
    def print_header(self):
        """Imprime el encabezado del script"""
        print("\n" + "="*70)
        print("  TRYONYOU PILOT REBUILD SYSTEM")
        print("  Patente: PCT/EP2025/067317")
        print("="*70 + "\n")
    
    def check_directory_structure(self):
        """Verifica la estructura de directorios necesarios"""
        print("📁 Verificando estructura de directorios...")
        
        required_dirs = [
            "backend",
            "api",
            "public",
            "src",
            "scripts"
        ]
        
        for dir_name in required_dirs:
            dir_path = self.root_dir / dir_name
            if dir_path.exists() and dir_path.is_dir():
                print(f"  ✓ {dir_name}/ existe")
                self.success_count += 1
            else:
                print(f"  ✗ {dir_name}/ no encontrado")
                self.error_count += 1
        print()
    
    def check_pilot_files(self):
        """Verifica archivos del piloto"""
        print("📄 Verificando archivos del piloto...")
        
        pilot_files = [
            "master_pilot.py",
            "pilot_server.py",
            "tryonyou_pilot_v1.py",
            "backend/main.py",
            "api/index.py"
        ]
        
        for file_name in pilot_files:
            file_path = self.root_dir / file_name
            if file_path.exists() and file_path.is_file():
                size = file_path.stat().st_size
                print(f"  ✓ {file_name} ({size} bytes)")
                self.success_count += 1
            else:
                print(f"  ✗ {file_name} no encontrado")
                self.error_count += 1
        print()
    
    def check_requirements(self):
        """Verifica archivos de requisitos"""
        print("📦 Verificando archivos de dependencias...")
        
        req_files = [
            "requirements.txt",
            "package.json",
            "backend/requirements.txt"
        ]
        
        for req_file in req_files:
            file_path = self.root_dir / req_file
            if file_path.exists():
                print(f"  ✓ {req_file} encontrado")
                self.success_count += 1
                
                # Mostrar información adicional
                if req_file == "package.json":
                    try:
                        with open(file_path, 'r') as f:
                            pkg_data = json.load(f)
                            if "scripts" in pkg_data:
                                print(f"    → Scripts disponibles: {', '.join(pkg_data['scripts'].keys())}")
                    except Exception as e:
                        self.warnings.append(f"No se pudo leer {req_file}: {e}")
            else:
                print(f"  ⚠ {req_file} no encontrado")
                self.warnings.append(f"{req_file} no encontrado")
        print()
    
    def check_configuration_files(self):
        """Verifica archivos de configuración"""
        print("⚙️  Verificando archivos de configuración...")
        
        config_files = [
            "vite.config.js",
            "tailwind.config.js",
            "postcss.config.js",
            "vercel.json"
        ]
        
        for config_file in config_files:
            file_path = self.root_dir / config_file
            if file_path.exists():
                print(f"  ✓ {config_file}")
                self.success_count += 1
            else:
                print(f"  ⚠ {config_file} no encontrado")
                self.warnings.append(f"{config_file} no encontrado")
        print()
    
    def verify_git_status(self):
        """Verifica el estado de git"""
        print("🔧 Verificando estado de Git...")
        
        git_dir = self.root_dir / ".git"
        if git_dir.exists():
            print("  ✓ Repositorio Git inicializado")
            self.success_count += 1
            
            # Intentar obtener información de git
            try:
                import subprocess
                result = subprocess.run(
                    ["git", "branch", "--show-current"],
                    capture_output=True,
                    text=True,
                    cwd=self.root_dir
                )
                if result.returncode == 0:
                    branch = result.stdout.strip()
                    print(f"    → Rama actual: {branch}")
            except Exception as e:
                self.warnings.append(f"No se pudo obtener información de Git: {e}")
        else:
            print("  ✗ No es un repositorio Git")
            self.error_count += 1
        print()
    
    def generate_pilot_status(self):
        """Genera un reporte de estado del piloto"""
        print("📊 Generando reporte de estado...")
        
        status = {
            "pilot_name": "TRYONYOU",
            "version": "1.0.0",
            "patent": "PCT/EP2025/067317",
            "checks_passed": self.success_count,
            "checks_failed": self.error_count,
            "warnings": len(self.warnings),
            "status": "READY" if self.error_count == 0 else "REQUIRES_ATTENTION"
        }
        
        status_file = self.root_dir / "pilot_status.json"
        try:
            with open(status_file, 'w') as f:
                json.dump(status, indent=2, fp=f)
            print(f"  ✓ Estado guardado en: pilot_status.json")
            self.success_count += 1
        except Exception as e:
            print(f"  ✗ Error guardando estado: {e}")
            self.error_count += 1
        print()
    
    def print_summary(self):
        """Imprime el resumen final"""
        print("="*70)
        print("  RESUMEN DE RECONSTRUCCIÓN")
        print("="*70)
        print(f"  ✓ Verificaciones exitosas: {self.success_count}")
        print(f"  ✗ Errores encontrados: {self.error_count}")
        print(f"  ⚠ Advertencias: {len(self.warnings)}")
        
        if self.warnings:
            print("\n  Advertencias:")
            for warning in self.warnings:
                print(f"    • {warning}")
        
        print("\n" + "="*70)
        
        if self.error_count == 0:
            print("  🎉 PILOTO RECONSTRUIDO EXITOSAMENTE")
            print("="*70 + "\n")
            return 0
        else:
            print("  ⚠️  PILOTO RECONSTRUIDO CON ADVERTENCIAS")
            print("="*70 + "\n")
            return 1
    
    def run(self):
        """Ejecuta el proceso completo de reconstrucción"""
        self.print_header()
        
        self.check_directory_structure()
        self.check_pilot_files()
        self.check_requirements()
        self.check_configuration_files()
        self.verify_git_status()
        self.generate_pilot_status()
        
        return self.print_summary()


def main():
    """Función principal"""
    rebuilder = PilotRebuilder()
    exit_code = rebuilder.run()
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
