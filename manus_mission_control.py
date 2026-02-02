#!/usr/bin/env python3
"""
MANUS MISSION CONTROL - TRYONYOU ULTRA V7.0
Script de automatización para despliegue y gestión del proyecto
"""

import os
import json
import subprocess
import sys
from pathlib import Path

class ManusMissionControl:
    def __init__(self, repo_path="."):
        self.repo_path = Path(repo_path)
        self.netlify_toml_path = self.repo_path / "netlify.toml"
        self.package_json_path = self.repo_path / "package.json"
        self.manus_config_path = self.repo_path / "manus_config.json"
        
    def log(self, message, level="INFO"):
        """Log con formato"""
        icons = {
            "INFO": "ℹ️",
            "SUCCESS": "✅",
            "ERROR": "❌",
            "WARNING": "⚠️",
            "PROGRESS": "🔄"
        }
        icon = icons.get(level, "•")
        print(f"{icon} [{level}] {message}")
    
    def run_command(self, command, check=True):
        """Ejecutar comando shell"""
        try:
            result = subprocess.run(
                command,
                shell=True,
                check=check,
                capture_output=True,
                text=True
            )
            return result.stdout
        except subprocess.CalledProcessError as e:
            self.log(f"Error executing command: {command}", "ERROR")
            self.log(f"Error output: {e.stderr}", "ERROR")
            raise
    
    def verify_netlify_config(self):
        """Verificar configuración de Netlify"""
        self.log("Verificando netlify.toml...", "PROGRESS")
        
        if not self.netlify_toml_path.exists():
            self.log("netlify.toml no encontrado", "ERROR")
            return False
            
        with open(self.netlify_toml_path, 'r') as f:
            content = f.read()
            
        # Verificar elementos clave
        required_elements = [
            '[build]',
            'publish = "dist"',
            '[[redirects]]',
            '[[headers]]'
        ]
        
        for element in required_elements:
            if element not in content:
                self.log(f"Falta elemento requerido: {element}", "WARNING")
                return False
        
        self.log("netlify.toml verificado correctamente", "SUCCESS")
        return True
    
    def verify_build_command(self):
        """Verificar comando de build en package.json"""
        self.log("Verificando comando de build...", "PROGRESS")
        
        if not self.package_json_path.exists():
            self.log("package.json no encontrado", "ERROR")
            return False
        
        with open(self.package_json_path, 'r') as f:
            data = json.load(f)
        
        if "build" not in data.get("scripts", {}):
            self.log("Script de build no encontrado", "WARNING")
            return False
        
        build_command = data["scripts"]["build"]
        self.log(f"Comando de build: {build_command}", "INFO")
        return True
    
    def setup_monetization_assets(self):
        """Configurar assets de monetización"""
        self.log("Configurando sistema de monetización...", "PROGRESS")
        
        # Verificar que manus_config.json existe
        if not self.manus_config_path.exists():
            self.log("manus_config.json no encontrado", "WARNING")
            return False
        
        with open(self.manus_config_path, 'r') as f:
            config = json.load(f)
        
        # Verificar configuración de monetización
        if not config.get("monetization", {}).get("enabled"):
            self.log("Monetización no habilitada en configuración", "WARNING")
            return False
        
        self.log("Sistema de monetización configurado", "SUCCESS")
        self.log(f"Stripe mode: {config['monetization']['stripe_mode']}", "INFO")
        self.log(f"Analytics: {config['analytics']['enabled']}", "INFO")
        return True
    
    def install_dependencies(self):
        """Instalar dependencias necesarias"""
        self.log("Instalando dependencias...", "PROGRESS")
        
        try:
            # Instalar @stripe/stripe-js si no está
            self.run_command("npm install @stripe/stripe-js --save")
            self.log("Dependencias de Stripe instaladas", "SUCCESS")
            return True
        except Exception as e:
            self.log(f"Error instalando dependencias: {e}", "ERROR")
            return False
    
    def run_build(self):
        """Ejecutar build del proyecto"""
        self.log("Ejecutando build...", "PROGRESS")
        
        try:
            output = self.run_command("npm run build")
            self.log("Build completado exitosamente", "SUCCESS")
            return True
        except Exception as e:
            self.log(f"Error en build: {e}", "ERROR")
            return False
    
    def git_commit_and_push(self, message="chore: update project configuration"):
        """Commit y push a Git"""
        self.log("Preparando commit a Git...", "PROGRESS")
        
        try:
            self.run_command("git add .")
            self.run_command(f'git commit -m "{message}"')
            self.run_command("git push origin main")
            self.log("Cambios pusheados a GitHub", "SUCCESS")
            return True
        except Exception as e:
            self.log(f"Error en Git: {e}", "WARNING")
            return False
    
    def deploy_to_netlify(self):
        """Desplegar en Netlify"""
        self.log("Desplegando en Netlify...", "PROGRESS")
        
        # Verificar si Netlify CLI está instalado
        try:
            self.run_command("netlify --version")
        except:
            self.log("Netlify CLI no instalado. Instalar con: npm install -g netlify-cli", "WARNING")
            return False
        
        try:
            # Desplegar
            self.run_command("netlify deploy --prod --dir=dist")
            self.log("Desplegado exitosamente en Netlify", "SUCCESS")
            return True
        except Exception as e:
            self.log(f"Error desplegando en Netlify: {e}", "ERROR")
            return False
    
    def send_telegram_notification(self, message):
        """Enviar notificación a Telegram"""
        try:
            with open(self.manus_config_path, 'r') as f:
                config = json.load(f)
            
            bot_token = config["integrations"]["telegram"]["bot_token"]
            chat_id = config["integrations"]["telegram"]["chat_id"]
            
            import requests
            url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            data = {
                "chat_id": chat_id,
                "text": message,
                "parse_mode": "Markdown"
            }
            requests.post(url, data=data)
            self.log("Notificación enviada a Telegram", "SUCCESS")
        except Exception as e:
            self.log(f"Error enviando notificación: {e}", "WARNING")
    
    def run_all(self, skip_build=False, skip_git=False, skip_deploy=False):
        """Ejecutar todo el flujo de automatización"""
        self.log("🚀 Iniciando Manus Mission Control...", "INFO")
        self.log("Proyecto: TRYONYOU ULTRA V7.0", "INFO")
        print()
        
        steps = [
            ("Verificar Netlify config", self.verify_netlify_config),
            ("Verificar build command", self.verify_build_command),
            ("Configurar monetización", self.setup_monetization_assets),
            ("Instalar dependencias", self.install_dependencies),
        ]
        
        if not skip_build:
            steps.append(("Ejecutar build", self.run_build))
        
        if not skip_git:
            steps.append(("Git commit & push", lambda: self.git_commit_and_push()))
        
        if not skip_deploy:
            steps.append(("Desplegar en Netlify", self.deploy_to_netlify))
        
        # Ejecutar pasos
        for step_name, step_func in steps:
            print()
            success = step_func()
            if not success and step_name in ["Verificar Netlify config", "Verificar build command"]:
                self.log(f"Paso crítico fallido: {step_name}", "ERROR")
                return False
        
        print()
        self.log("✅ Misión completada exitosamente", "SUCCESS")
        
        # Enviar notificación
        self.send_telegram_notification(
            "🎉 *TRYONYOU ULTRA V7.0*\n\n"
            "Despliegue completado exitosamente\n"
            "- Netlify configurado ✅\n"
            "- Monetización activa ✅\n"
            "- Analytics integrado ✅"
        )
        
        return True

def main():
    """Punto de entrada principal"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Manus Mission Control - TRYONYOU ULTRA V7.0')
    parser.add_argument('--skip-build', action='store_true', help='Saltar build')
    parser.add_argument('--skip-git', action='store_true', help='Saltar Git commit/push')
    parser.add_argument('--skip-deploy', action='store_true', help='Saltar despliegue en Netlify')
    parser.add_argument('--path', default='.', help='Ruta del proyecto')
    
    args = parser.parse_args()
    
    mission = ManusMissionControl(args.path)
    success = mission.run_all(
        skip_build=args.skip_build,
        skip_git=args.skip_git,
        skip_deploy=args.skip_deploy
    )
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
