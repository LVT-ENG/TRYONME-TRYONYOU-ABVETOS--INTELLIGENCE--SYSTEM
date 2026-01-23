import cv2
import numpy as np

# Create a 400x400 transparent image
width, height = 400, 400
img = np.zeros((height, width, 4), dtype=np.uint8)

# Draw a Gold Blazer-like shape
# Color: Gold (BGR: 0, 215, 255) - CV2 uses BGR
gold_color = (0, 215, 255, 255) # Add Alpha=255

# Define a polygon for a simple blazer/shirt shape
pts = np.array([
    [100, 50],  # Left Shoulder
    [300, 50],  # Right Shoulder
    [350, 150], # Right Armpit outer
    [320, 350], # Right Bottom
    [80, 350],  # Left Bottom
    [50, 150]   # Left Armpit outer
], np.int32)

pts = pts.reshape((-1, 1, 2))
cv2.fillPoly(img, [pts], gold_color)

# Add a "V" neck cut
neck_pts = np.array([
    [150, 50],
    [250, 50],
    [200, 150]
], np.int32)
cv2.fillPoly(img, [neck_pts], (0, 0, 0, 0)) # Transparent cut

# Save
cv2.imwrite('static/assets/blazer.png', img)
print("Dummy asset created at static/assets/blazer.png")
