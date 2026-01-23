import cv2
import mediapipe as mp
import numpy as np
import time
from physics_engine import FabricPhysics

# New Tasks API imports
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

class LiveSmartMirror:
    def __init__(self, model_path='pose_landmarker_lite.task'):
        # Initialize Pose Landmarker using Tasks API
        base_options = python.BaseOptions(model_asset_path=model_path)
        options = vision.PoseLandmarkerOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.VIDEO
        )
        self.landmarker = vision.PoseLandmarker.create_from_options(options)
        
        self.physics = FabricPhysics()
        
        # State
        self.prev_landmarks = None
        self.mesh_grid_points = None
        self.grid_rows = 5
        self.grid_cols = 5
        self.current_garment = "Algodon_Stretch"
        
        # Timestamp management for VIDEO mode
        self.start_time = time.time()

    def process_live_frame(self, frame, timestamp_ms=None):
        """Processes a single frame."""
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)
        
        # Calculate timestamp if not provided
        if timestamp_ms is None:
             # Use relative time in ms
             timestamp_ms = int((time.time() - self.start_time) * 1000)
        
        # Detect
        detection_result = self.landmarker.detect_for_video(mp_image, timestamp_ms)
        
        # Process Results
        if detection_result.pose_landmarks:
            # detection_result.pose_landmarks is a list of lists (one per detected person)
            # We assume single person (index 0)
            if len(detection_result.pose_landmarks) > 0:
                landmarks = detection_result.pose_landmarks[0]
                h, w, _ = frame.shape
                
                # Extract key landmarks
                # Tasks API landmarks have x, y, z, presence, visibility
                # x and y are normalized [0,1]
                
                shoulders = [
                    np.array([landmarks[11].x * w, landmarks[11].y * h]),
                    np.array([landmarks[12].x * w, landmarks[12].y * h])
                ]
                hips = [
                    np.array([landmarks[23].x * w, landmarks[23].y * h]),
                    np.array([landmarks[24].x * w, landmarks[24].y * h])
                ]
                
                # 1. Target Mesh
                target_mesh = self._generate_target_mesh(shoulders, hips)
                
                # 2. Movement Vector
                current_center = np.mean(shoulders, axis=0)
                movement_vector = np.array([0.0, 0.0])
                
                if self.prev_landmarks is not None:
                    prev_center = self.prev_landmarks
                    movement_vector = current_center - prev_center
                
                self.prev_landmarks = current_center
                
                # 3. Physics
                self._update_mesh_physics(target_mesh, movement_vector)
                
                # 4. Render
                self._render_mesh(frame)
            
        return frame

    def _generate_target_mesh(self, shoulders, hips):
        tl = shoulders[0]
        tr = shoulders[1]
        bl = hips[0]
        br = hips[1]
        
        left_edge = np.linspace(tl, bl, self.grid_rows)
        right_edge = np.linspace(tr, br, self.grid_rows)
        
        grid = []
        for i in range(self.grid_rows):
            row_points = np.linspace(left_edge[i], right_edge[i], self.grid_cols)
            grid.append(row_points)
            
        return np.array(grid)

    def _update_mesh_physics(self, target_mesh, movement_vector):
        inertia, gravity = self.physics.apply_cloth_simulation(self.current_garment, movement_vector)
        
        if self.mesh_grid_points is None:
            self.mesh_grid_points = target_mesh
            return

        updated_grid = np.copy(target_mesh)
        
        for r in range(self.grid_rows):
            for c in range(self.grid_cols):
                pin_factor = r / (self.grid_rows - 1)
                
                inertia_offset = inertia * pin_factor * 2.0
                gravity_offset = np.array([0, gravity * pin_factor * 2.0])
                
                target_point = target_mesh[r][c] - inertia_offset + gravity_offset
                
                current_point = self.mesh_grid_points[r][c]
                new_point = current_point * 0.4 + target_point * 0.6
                
                updated_grid[r][c] = new_point

        self.mesh_grid_points = updated_grid

    def _render_mesh(self, frame):
        if self.mesh_grid_points is None:
            return

        for r in range(self.grid_rows):
            for c in range(self.grid_cols - 1):
                pt1 = tuple(self.mesh_grid_points[r][c].astype(int))
                pt2 = tuple(self.mesh_grid_points[r][c+1].astype(int))
                cv2.line(frame, pt1, pt2, (0, 255, 255), 2)
                
        for r in range(self.grid_rows - 1):
            for c in range(self.grid_cols):
                pt1 = tuple(self.mesh_grid_points[r][c].astype(int))
                pt2 = tuple(self.mesh_grid_points[r+1][c].astype(int))
                cv2.line(frame, pt1, pt2, (0, 255, 255), 2)
        
        for r in [0, self.grid_rows-1]:
             for c in [0, self.grid_cols-1]:
                  pt = tuple(self.mesh_grid_points[r][c].astype(int))
                  cv2.circle(frame, pt, 4, (0, 255, 0), -1)
