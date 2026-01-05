def calculate_height_correction(raw_height_m):
    # Lógica para corregir el error de los 4 metros
    correction_factor = 0.95 
    return round(raw_height_m * correction_factor, 2)

def matching_engine(user_data, inventory):
    # Motor de búsqueda de tallas y looks
    return "Optimized Match Found"
