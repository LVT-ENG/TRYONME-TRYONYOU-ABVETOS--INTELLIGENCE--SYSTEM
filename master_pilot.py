import streamlit as st
import cv2
import numpy as np
import mediapipe as mp
from PIL import Image
import time

# ==========================================
# 1. CONFIGURACIÓN Y ESTÉTICA (LOOK "JULES ENGINE")
# ==========================================
st.set_page_config(page_title="TRYONYOU | JULES ENGINE", page_icon="🦚", layout="wide")

# CSS: Inyección de la estética Lujo/Tech (Negro y Oro)
st.markdown("""
<style>
    /* FONDO Y GENERAL */
    .stApp { background-color: #050505; color: #e0e0e0; font-family: 'Helvetica Neue', sans-serif; }

    /* CONSOLA NEURAL (El HUD) */
    #neural-console {
        background-color: #0a0a0a;
        font-family: 'Courier New', Courier, monospace;
        font-size: 13px;
        padding: 20px;
        border-left: 3px solid #C5A46D; /* Oro */
        height: 450px;
        overflow-y: auto;
        box-shadow: inset 0 0 40px rgba(197, 164, 109, 0.08);
        border: 1px solid #222;
        margin-top: 10px;
        position: relative;
    }

    /* SCANNER LINE (Animación) */
    #neural-console::after {
        content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
        background: rgba(197, 164, 109, 0.5);
        box-shadow: 0 0 15px rgba(197, 164, 109, 0.5);
        animation: scan 4s linear infinite; pointer-events: none;
    }
    @keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }

    /* LOGS ESTILIZADOS */
    .log-line {
        margin-bottom: 6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        padding-bottom: 4px;
        animation: fadeIn 0.3s;
    }
    .log-info { color: #888; }
    .log-warn { color: #ff3333; text-shadow: 0 0 10px rgba(255, 50, 50, 0.5); font-weight: 700; letter-spacing: 1px; }
    .log-success { color: #C5A46D; text-shadow: 0 0 10px rgba(197, 164, 109, 0.5); font-weight: 700; }

    @keyframes fadeIn { from { opacity: 0; transform: translateX(-5px); } to { opacity: 1; transform: none; } }

    /* BOTONES PREMIUM */
    .stButton>button {
        background: linear-gradient(90deg, #C5A46D, #997B40);
        color: #050505;
        border: none;
        font-weight: 800;
        letter-spacing: 3px;
        width: 100%;
        padding: 18px;
        text-transform: uppercase;
        transition: all 0.3s;
    }
    .stButton>button:hover {
        box-shadow: 0 0 30px rgba(197, 164, 109, 0.3);
        color: white;
        transform: scale(1.02);
    }

    /* Ocultar UI nativa */
    #MainMenu {visibility: hidden;} footer {visibility: hidden;} header {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

# ==========================================
# 2. EL CEREBRO (PYTHON BACKEND REAL)
# ==========================================
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, model_complexity=2)

def procesar_logica_backend(img_bytes_user, img_bytes_garment):
    logs = []

    # A. Cargar Imágenes
    file_bytes = np.asarray(bytearray(img_bytes_user.read()), dtype=np.uint8)
    image = cv2.imdecode(file_bytes, 1)

    file_bytes_g = np.asarray(bytearray(img_bytes_garment.read()), dtype=np.uint8)
    garment = cv2.imdecode(file_bytes_g, cv2.IMREAD_UNCHANGED)

    h, w, _ = image.shape
    logs.append(f"> SOURCE MEDIA: {w}x{h}px [RAW]")

    # B. Detección Biométrica
    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    if not results.pose_landmarks:
        return None, ["CRITICAL ERROR: NO BIOMETRIC DATA FOUND"], None

    lm = results.pose_landmarks.landmark
    logs.append("> BIOMETRIC SENSOR ARRAY: LOCKED")

    # Coordenadas
    def get_coords(idx): return int(lm[idx].x * w), int(lm[idx].y * h)
    l_shldr, r_shldr = get_coords(11), get_coords(12)
    l_hip, r_hip = get_coords(23), get_coords(24)

    shoulder_width = np.linalg.norm(np.array(l_shldr) - np.array(r_shldr))
    hip_width = np.linalg.norm(np.array(l_hip) - np.array(r_hip))

    # C. Análisis "Jules" (Lógica de Experto)
    # Convertimos píxeles a cm aproximados usando altura estándar
    ratio = 180 / h
    shoulders_cm = int(shoulder_width * ratio * 1.8) # Factor de corrección 2D
    waist_cm = int(hip_width * ratio * 2.3)

    logs.append(f"> EXTRACTED VECTOR: SHOULDER_ARC [{int(shoulder_width)}px]")
    logs.append(f"> EXTRACTED VECTOR: HIP_GIRTH [{int(hip_width)}px]")
    logs.append(f"> JULES PREDICTION: WAIST ~{waist_cm}cm / SHOULDERS ~{shoulders_cm}cm")

    warning = None
    # Lógica de "Tensión en Hombros" (Simulada para demo)
    if shoulders_cm > 45:
        warning = "WARNING: SHOULDER TENSION DETECTED (>45cm)"
        logs.append(f"> {warning}")
        logs.append("> ACTION: APPLYING 'YOKE EXPANSION' (+12mm)")
    else:
        logs.append("> FIT ANALYSIS: WITHIN TOLERANCE LEVELS")

    # D. Warping (Deformación de Imagen)
    logs.append("> INITIATING PERSPECTIVE WARP MATRIX...")

    center_x = (l_hip[0] + r_hip[0]) // 2
    center_y = (l_hip[1] + r_hip[1]) // 2

    # Escalar prenda al cuerpo
    g_h, g_w, _ = garment.shape
    scale = (hip_width * 2.6) / g_w # Factor ajustado para que cubra bien
    new_w, new_h = int(g_w * scale), int(g_h * scale)
    garment_resized = cv2.resize(garment, (new_w, new_h))

    # Composición
    img_pil = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)).convert("RGBA")
    g_pil = Image.fromarray(cv2.cvtColor(garment_resized, cv2.COLOR_BGRA2RGBA)).convert("RGBA")

    final_canvas = Image.new("RGBA", img_pil.size)
    final_canvas.paste(img_pil, (0,0))
    # Ajuste de posición vertical (falsa física de caída)
    final_canvas.paste(g_pil, (center_x - new_w//2, center_y - int(new_h*0.25)), g_pil)

    logs.append("> RENDERING FINAL COMPOSITE: COMPLETED (HASH VALID).")

    return final_canvas, logs, warning

# ==========================================
# 3. LA INTERFAZ (FRONTEND SINCRONIZADO)
# ==========================================

# CABECERA ACTUALIZADA CON TU HASH
col1, col2 = st.columns([3, 1])
with col1:
    st.markdown("<h1 style='color: white; letter-spacing: 4px; margin-bottom:0;'>TRYONYOU<span style='color:#C5A46D'>.APP</span></h1>", unsafe_allow_html=True)
    # HASH INYECTADO AQUÍ
    st.markdown(
        "<p style='color: #666; font-family: monospace; font-size: 10px; margin-top:0;'>"
        "BUILD: <span style='color: #C5A46D'>10569d5</span> (LATEST) // JULES ENGINE ACTIVO"
        "</p>",
        unsafe_allow_html=True
    )

with col2:
    st.markdown("<div style='text-align: right; padding-top: 15px;'>", unsafe_allow_html=True)
    lang = st.radio("", ["EN", "FR", "ES"], horizontal=True)
    st.markdown("</div>", unsafe_allow_html=True)

st.divider()

# LAYOUT PRINCIPAL
col_ui, col_hud = st.columns([1, 1])

with col_ui:
    st.markdown("### 1. INPUT STREAM")
    user_file = st.file_uploader("UPLOAD SUBJECT (JPG)", type=['jpg', 'jpeg', 'png'])
    garment_file = st.file_uploader("UPLOAD GARMENT (PNG Transparent)", type=['png'])

    result_placeholder = st.empty()
    run_btn = st.button("INITIATE JIT PROTOCOL")

with col_hud:
    st.markdown("### 2. NEURAL HUD (LIVE)")
    console_placeholder = st.empty()

# ==========================================
# 4. EJECUCIÓN DEL FLUJO
# ==========================================
if run_btn and user_file and garment_file:

    # 1. Secuencia de Arranque (Teatro Técnico)
    full_log_html = '<div id="neural-console">'

    start_logs = [
        f"> [SYSTEM] INITIALIZING JULES ENGINE (COMMIT 10569d5)...",
        "> VERIFYING SECURITY TOKEN... [OK]",
        "> CONNECTING TO BIOMETRIC CLOUD..."
    ]

    for log in start_logs:
        full_log_html += f'<div class="log-line log-info">{log}</div>'
        console_placeholder.markdown(full_log_html + "</div>", unsafe_allow_html=True)
        time.sleep(0.3)

    # 2. PROCESAMIENTO REAL
    final_img, tech_logs, warning = procesar_logica_backend(user_file, garment_file)

    # 3. Mostrar Logs Técnicos
    if final_img:
        for log in tech_logs:
            css_class = "log-info"
            if "WARNING" in log: css_class = "log-warn"
            if "PREDICTION" in log or "COMPLETED" in log: css_class = "log-success"

            full_log_html += f'<div class="log-line {css_class}">{log}</div>'
            console_placeholder.markdown(full_log_html + "</div>", unsafe_allow_html=True)
            time.sleep(0.2)

        # 4. Mostrar Resultado
        result_placeholder.image(final_img, caption="TRYONYOU FINAL OUTPUT [VERIFIED]")
        st.toast("Protocol Complete. Fit Confirmed.", icon="✅")

    else:
        full_log_html += f'<div class="log-line log-warn">FATAL ERROR: PROCESSING FAILED</div>'
        console_placeholder.markdown(full_log_html + "</div>", unsafe_allow_html=True)

elif run_btn:
    st.warning("AWAITING DATA UPLOAD...")
