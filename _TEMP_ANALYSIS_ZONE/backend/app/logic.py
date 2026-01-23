from typing import List, Optional
from .models import UserData, Garment

def calculate_perfect_fit(user: UserData, garments: List[Garment]) -> Optional[Garment]:
    # Simulation of landmarks to real cm calculation
    # In production, this would use the distance between shoulders (MediaPipe points 11 and 12)
    # scaled by user height to derive approximate body measurements.
    
    # For this MVP/Demo, we use a simplified approximation based on height/weight/ratio
    # to find the "best match" in the category.
    
    best_match = None
    min_diff = float('inf')

    # Simple heuristic to approximate waist from inputs for matching purposes
    # This is purely for the demo algorithm to have something to compare
    if user.height == 0:
        return None
        
    estimated_waist = (user.weight / user.height) * 300 # Rough heuristic
    
    for item in garments:
        if item.category != user.event_type:
            continue
            
        # The "Secret": Adjust garment measurement tolerance based on elasticity
        # Higher elasticity = wider range of fit
        tolerance_factor = 1 + item.elasticity
        adjusted_waist_target = item.base_measurements["waist"] * tolerance_factor
        
        # Calculate difference. 
        # Note: In a real system, we'd compare chest, waist, and hip.
        # Here we focus on one dimension for the MVP demo logic provided in the prompt.
        # We try to match the estimated user waist to the garment's adjustable waist.
        
        # We assume the garment fits if the user's size is within the elasticity range
        # Here we just look for the closest "center point" of fit
        
        diff = abs(estimated_waist - item.base_measurements["waist"])
        
        # We penalize low elasticity items if the fit isn't exact (simulated logic)
        if item.elasticity < 0.1:
            diff *= 1.5 
            
        if diff < min_diff:
            min_diff = diff
            best_match = item

    return best_match
