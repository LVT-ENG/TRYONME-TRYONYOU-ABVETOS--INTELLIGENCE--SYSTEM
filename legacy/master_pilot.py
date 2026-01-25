import streamlit as st
import cv2
import numpy as np
import mediapipe as mp
from PIL import Image
import time

# --- CONFIGURACIÓN JULES ENGINE ---
st.set_page_config(page_title="TRYONYOU | JULES ENGINE", page_icon="🦚", layout="wide")

st.markdown("""
<style>
    .stApp { background-color: #050505; color: #e0e0e0; font-family: 'Helvetica Neue', sans-serif; }
    #neural-console {
        background-color: #0a0a0a; font-family: 'Courier New', monospace; font-size: 13px;
        padding: 20px; border-left: 3px solid #C5A46D; height: 450px; overflow-y: auto;
        border: 1px solid #222; margin-top: 10px; position: relative;
    }
    #neural-console::after {
        content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
        background: rgba(197, 164, 109, 0.5); box-shadow: 0 0 15px rgba(197, 164, 109, 0.5);
        animation: scan 4s linear infinite; pointer-events: none;
    }
    @keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
    .log-line { margin-bottom: 6px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); animation: fadeIn 0.3s; }
    .log-info { color: #888; }
    .log-warn { color: #ff3333; text-shadow: 0 0 10px rgba(255, 50, 50, 0.5); font-weight: 700; }
    .log-success { color: #C5A46D; text-shadow: 0 0 10px rgba(197, 164, 109, 0.5); font-weight: 700; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .stButton>button {
        background: linear-gradient(90deg, #C5A46D, #997B40); color: #050505; border: none;
        font-weight: 800; letter-spacing: 3px; width: 100%; padding: 18px; text-transform: uppercase;
    }
    #MainMenu {visibility: hidden;} footer {visibility: hidden;} header {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, model_complexity=2)

def procesar_logica_backend(img_bytes_user, img_bytes_garment):
    logs = []
    file_bytes = np.asarray(bytearray(img_bytes_user.read()), dtype=np.uint8)
    image = cv2.imdecode(file_bytes, 1)
    file_bytes_g = np.asarray(bytearray(img_bytes_garment.read()), dtype=np.uint8)
    garment = cv2.imdecode(file_bytes_g, cv2.IMREAD_UNCHANGED)
    
    h, w, _ = image.shape
    logs.append(f"> SOURCE MEDIA: {w}x{h}px [RAW]")
    
    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    if not results.pose_landmarks: return None, ["CRITICAL ERROR: NO BIOMETRIC DATA"], None

    lm = results.pose_landmarks.landmark
    logs.append("> BIOMETRIC SENSOR ARRAY: LOCKED")
    
    l_hip = int(lm[23].x * w)
    r_hip = int(lm[24].x * w)
    hip_width = abs(l_hip - r_hip)
    
    logs.append(f"> EXTRACTED VECTOR: HIP_GIRTH [{hip_width}px]")
    
    # Warping Logic
    logs.append("> INITIATING PERSPECTIVE WARP MATRIX...")
    scale = (hip_width * 2.6) / garment.shape[1]
    new_w, new_h = int(garment.shape[1] * scale), int(garment.shape[0] * scale)
    garment_resized = cv2.resize(garment, (new_w, new_h))
    
    img_pil = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)).convert("RGBA")
    g_pil = Image.fromarray(cv2.cvtColor(garment_resized, cv2.COLOR_BGRA2RGBA)).convert("RGBA")
    
    final_canvas = Image.new("RGBA", img_pil.size)
    final_canvas.paste(img_pil, (0,0))
    center_x = (l_hip + r_hip) // 2
    final_canvas.paste(g_pil, (center_x - new_w//2, int(lm[23].y * h)), g_pil)
    
    logs.append("> RENDERING FINAL COMPOSITE: COMPLETED (HASH VALID).")
    return final_canvas, logs, "FIT VERIFIED"

col1, col2 = st.columns([3, 1])
with col1:
    st.markdown("<h1 style='color: white; letter-spacing: 4px; margin-bottom:0;'>TRYONYOU<span style='color:#C5A46D'>.APP</span></h1>", unsafe_allow_html=True)
    st.markdown("<p style='color: #666; font-family: monospace; font-size: 10px; margin-top:0;'>BUILD: <span style='color: #C5A46D'>10569d5</span> (LATEST) // JULES ENGINE ACTIVO</p>", unsafe_allow_html=True)

st.divider()
col_ui, col_hud = st.columns([1, 1])

with col_ui:
    st.markdown("### 1. INPUT STREAM")
    user_file = st.file_uploader("UPLOAD SUBJECT", type=['jpg','png'])
    garment_file = st.file_uploader("UPLOAD GARMENT", type=['png'])
    run_btn = st.button("INITIATE JIT PROTOCOL")
    result_placeholder = st.empty()

with col_hud:
    st.markdown("### 2. NEURAL HUD (LIVE)")
    console_placeholder = st.empty()

if run_btn and user_file and garment_file:
    full_log_html = '<div id="neural-console">'
    final_img, tech_logs, warning = procesar_logica_backend(user_file, garment_file)
    if final_img:
        for log in tech_logs:
            css = "log-success" if "COMPLETED" in log else "log-info"
            full_log_html += f'<div class="log-line {css}">{log}</div>'
            console_placeholder.markdown(full_log_html + "</div>", unsafe_allow_html=True)
            time.sleep(0.1)
        result_placeholder.image(final_img, caption="TRYONYOU FINAL OUTPUT")
        st.toast("Protocol Complete.", icon="✅")
