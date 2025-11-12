import matplotlib.pyplot as plt
import pandas as pd
import os

# Data from the Investor Document
data = {
    'Year': ['2025 (E)', '2026 (P)', '2027 (P)'],
    'ARR': [5, 25, 75]  # Values in Millions of Euros
}
df = pd.DataFrame(data)

# Define the output path
output_path = os.path.join(os.getcwd(), 'docs', 'investors', 'Projected_ARR_Growth_2025-2027.png')

# Create the plot
plt.figure(figsize=(10, 6))
plt.plot(df['Year'], df['ARR'], marker='o', linestyle='-', color='#D4AF37', linewidth=3, markersize=8)

# Add titles and labels
plt.title('Projected ARR Growth (2025-2027)', fontsize=16, fontweight='bold', color='#1a1a1a')
plt.xlabel('Year', fontsize=12, color='#4a4a4a')
plt.ylabel('ARR (€ Millions)', fontsize=12, color='#4a4a4a')

# Add grid and customize ticks
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.yticks(df['ARR'], [f'€{x}M' for x in df['ARR']])

# Customize plot appearance (Nine Gold Beige theme)
plt.gca().set_facecolor('#F9FAFB')
plt.gcf().set_facecolor('#F9FAFB')
plt.tick_params(axis='x', colors='#4a4a4a')
plt.tick_params(axis='y', colors='#4a4a4a')
plt.gca().spines['top'].set_visible(False)
plt.gca().spines['right'].set_visible(False)
plt.gca().spines['bottom'].set_color('#4a4a4a')
plt.gca().spines['left'].set_color('#4a4a4a')

# Add data labels on the points
for i, txt in enumerate(df['ARR']):
    plt.annotate(f'€{txt}M', (df['Year'][i], df['ARR'][i]), textcoords="offset points", xytext=(0,10), ha='center', color='#1a1a1a', fontweight='bold')

# Save the plot
plt.tight_layout()
plt.savefig(output_path)

print(f"Graph saved to: {output_path}")
