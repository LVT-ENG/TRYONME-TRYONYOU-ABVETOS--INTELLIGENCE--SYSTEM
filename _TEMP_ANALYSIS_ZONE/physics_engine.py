import numpy as np

class FabricPhysics:
    def __init__(self):
        # Technical Parameters: Mass, Elasticity (Stiffness), Air Resistance (Damping/Draping)
        self.materials = {
            "Lana_Premium": {"mass": 0.8, "stiffness": 0.9, "draping": 0.2},
            "Lino_Verano":  {"mass": 0.3, "stiffness": 0.4, "draping": 0.7},
            "Algodon_Stretch": {"mass": 0.5, "stiffness": 0.6, "draping": 0.4}
        }

    def apply_cloth_simulation(self, garment_type, movement_vector):
        """Calculates cloth lag and inertia based on user movement."""
        props = self.materials.get(garment_type, self.materials["Algodon_Stretch"])
        
        # Inertia: How long the cloth takes to 'follow' the body
        # movement_vector is expected to be a numpy array or tuple (dx, dy)
        if not isinstance(movement_vector, np.ndarray):
             movement_vector = np.array(movement_vector)
             
        inertia = movement_vector * props['mass']
        
        # Draping: Effect of gravity on the fabric
        # We model this as a downward force.
        # Higher draping factor = more sag/gravity effect.
        gravity_effect = props['draping'] * 9.81
        
        return inertia, gravity_effect
