from .models import Garment

# Mock inventory data
inventory = [
    Garment(id="Laf-001", name="Blazer Seda Medianoche", category="Gala", elasticity=0.1, 
            base_measurements={"chest": 95, "waist": 80, "hip": 100}),
    Garment(id="Laf-002", name="Vestido Drapeado Velvet", category="Gala", elasticity=0.4, 
            base_measurements={"chest": 90, "waist": 70, "hip": 95}),
    Garment(id="Laf-003", name="Pantalón Wide Leg Lino", category="Casual", elasticity=0.05, 
            base_measurements={"chest": 0, "waist": 75, "hip": 105}),
    Garment(id="Laf-004", name="Traje Estructurado Gris", category="Business", elasticity=0.0, 
            base_measurements={"chest": 100, "waist": 85, "hip": 100}),
]

def get_inventory():
    return inventory
