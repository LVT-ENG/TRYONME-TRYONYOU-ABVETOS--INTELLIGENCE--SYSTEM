import json
import os

class MOE_Router:
    def __init__(self):
        # Ajustamos la ruta para que funcione desde la raíz del proyecto
        self.config_path = os.path.join("core", "ai_config", "moe_prompts_manifest.json")
        self.experts = self._load_experts()

    def _load_experts(self):
        try:
            with open(self.config_path, 'r') as f:
                data = json.load(f)
                return data['agents']
        except Exception as e:
            print(f"❌ Error loading experts config: {e}")
            return {}

    def get_system_instruction(self, agent_id):
        return self.experts.get(agent_id)
