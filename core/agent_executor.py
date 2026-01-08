import os
import json
import google.generativeai as genai
from core.google_ai_bridge import MOE_Router

class AgentExecutor:
    def __init__(self):
        self.router = MOE_Router()
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            print("⚠️ ERROR CRÍTICO: GOOGLE_API_KEY no encontrada en variables de entorno.")
            self.model_active = False
        else:
            genai.configure(api_key=api_key)
            self.model_active = True

    def _clean_json_response(self, text):
        return text.replace("```json", "").replace("```", "").strip()

    def run_expert(self, agent_id, input_data):
        if not self.model_active:
            return {"error": "API Key no configurada. Revisa tu archivo .env"}

        agent_config = self.router.get_system_instruction(agent_id)
        if not agent_config:
            return {"error": f"Agente '{agent_id}' no encontrado."}

        print(f"⚡ Ejecutando {agent_config['role']}...")

        model = genai.GenerativeModel(
            model_name=agent_config['model'],
            generation_config={"temperature": agent_config['temperature'], "response_mime_type": "application/json"},
            system_instruction=agent_config['system_instruction']
        )

        user_prompt = f"INPUT DATA: {json.dumps(input_data)}"

        try:
            response = model.generate_content(user_prompt)
            return json.loads(self._clean_json_response(response.text))
        except Exception as e:
            error_str = str(e).lower()
            if "not found" in error_str or "404" in error_str or "invalid argument" in error_str:
                print(f"⚠️ Model {agent_config['model']} not found or unavailable. Falling back to Gemini 1.5...")

                # Determine fallback model
                fallback_model_name = "gemini-1.5-flash"
                if "pro" in agent_config['model']:
                    fallback_model_name = "gemini-1.5-pro"

                fallback_model = genai.GenerativeModel(
                    model_name=fallback_model_name,
                    generation_config={"temperature": agent_config['temperature'], "response_mime_type": "application/json"},
                    system_instruction=agent_config['system_instruction']
                )

                try:
                    print(f"⚡ Rerunning with {fallback_model_name}...")
                    response = fallback_model.generate_content(user_prompt)
                    return json.loads(self._clean_json_response(response.text))
                except Exception as fallback_error:
                    print(f"❌ Error en Fallback Gemini: {str(fallback_error)}")
                    return {"error": str(fallback_error)}

            print(f"❌ Error en Gemini: {str(e)}")
            return {"error": str(e)}
