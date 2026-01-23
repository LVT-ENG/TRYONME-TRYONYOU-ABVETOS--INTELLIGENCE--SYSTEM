import streamlit as st
import cv2
import numpy as np
from PIL import Image
import mediapipe as mp
from divineo_engine import BodyScanner, calculate_fit, MOCK_CATALOGUE

# Configure Streamlit page
st.set_page_config(page_title="Divineo Master Engine", page_icon="🏛️")

# Initialize BodyScanner
@st.cache_resource
def get_scanner():
    return BodyScanner()

scanner = get_scanner()

# Header
st.title("🏛️ Divineo Master Engine")
st.markdown("### El Espejo Digital de Alta Costura")

# Sidebar: Garment Selection
st.sidebar.header("Configuración")
garment_options = list(MOCK_CATALOGUE.keys())
selected_garment_id = st.sidebar.selectbox("Seleccione una prenda:", garment_options)
selected_garment_info = MOCK_CATALOGUE[selected_garment_id]
st.sidebar.info(f"Prenda: {selected_garment_id}\nTela: {selected_garment_info['fabric']}")

# Main: The Mirror
st.markdown("---")
st.subheader("Visualización en Tiempo Real")

camera_image = st.camera_input("Tome una foto para analizar el ajuste")

if camera_image is not None:
    # Convert Streamlit/PIL image to CV2 (BGR)
    file_bytes = np.asarray(bytearray(camera_image.read()), dtype=np.uint8)
    frame = cv2.imdecode(file_bytes, 1) # BGR

    # Process Frame
    results = scanner.process_frame(frame)

    # Draw Landmarks
    if results.pose_landmarks:
        mp_drawing = mp.solutions.drawing_utils
        mp_pose = mp.solutions.pose
        
        # Draw on a copy of the image (convert back to RGB for display)
        annotated_image = frame.copy()
        mp_drawing.draw_landmarks(
            annotated_image,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2),
            connection_drawing_spec=mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
        )
        
        # Display the "Mirror" with overlay
        st.image(cv2.cvtColor(annotated_image, cv2.COLOR_BGR2RGB), caption="Escaneo Digital Completado", use_column_width=True)
        
        # Calculate Fit
        proportions = scanner.get_proportions(results.pose_landmarks.landmark)
        width_ratio = proportions["width_ratio"]
        
        fit_result = calculate_fit(width_ratio, selected_garment_id)
        
        # Display Claims / Results
        st.markdown("---")
        st.subheader("Análisis de Ajuste Divineo")
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Factor de Estructura", f"{width_ratio:.4f}")
        with col2:
            st.metric("Prenda Seleccionada", selected_garment_id)
            
        st.success(f"**Veredicto:** {fit_result}")
        
    else:
        st.image(camera_image, caption="Imagen original (No se detectó cuerpo)", use_column_width=True)
        st.warning("No se pudo detectar la postura del cuerpo. Por favor, asegúrese de que su cuerpo completo sea visible.")

else:
    st.info("Esperando entrada visual...")

# Footer
st.markdown("---")
st.caption("Divineo Master Engine v1.0 - Powered by MediaPipe & Gemini")
