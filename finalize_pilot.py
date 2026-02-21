import os
import subprocess

def finalize():
    print("🚀 Iniciando despliegue final de 22TRYONYOU...")
    pip_cmd = ".venv/bin/pip" if os.path.exists(".venv") else "pip3"
    subprocess.run(f"{pip_cmd} install -r requirements.txt", shell=True)
    subprocess.run("npm install && npm run build", shell=True)
    print("🌍 Subiendo piloto comercial a Vercel...")
    subprocess.run("npx vercel --prod --confirm", shell=True)
    print("\n✅ PROYECTO CONCLUIDO. Tu piloto ya es funcional y comercial.")

if __name__ == "__main__":
    finalize()
