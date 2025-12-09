import configparser
import os
import subprocess

def parse_content_map(file_path):
    """Parsea el archivo content_map.txt para extraer los datos."""
    data = {}
    config = configparser.ConfigParser()
    # Leer el archivo, ignorando la primera línea de comentario
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read().split('\n', 1)[1]
    
    config.read_string(content)
    
    for section in config.sections():
        data.update(config.items(section))
        
    return data

def generate_markdown_content(template_path, content_data, output_path="one_pager_content.md"):
    """Genera el contenido Markdown a partir de la plantilla y los datos."""
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
        
    # Formatear los datos para la plantilla
    formatted_data = {k: v for k, v in content_data.items()}
    
    # Reemplazar placeholders en la plantilla
    for key, value in formatted_data.items():
        template = template.replace(f'{{{key}}}', value)
        
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(template)
        
    return output_path

def convert_md_to_pdf(md_path, pdf_path):
    """Convierte el archivo Markdown a PDF usando la utilidad del sistema."""
    try:
        # Usar la utilidad manus-md-to-pdf
        command = ['manus-md-to-pdf', md_path, pdf_path]
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        print(f"PDF generado con éxito en: {pdf_path}")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error al convertir Markdown a PDF: {e}")
        print(f"Stdout: {e.stdout}")
        print(f"Stderr: {e.stderr}")
        raise

def update_pdf():
    """Función principal para actualizar el PDF."""
    try:
        content_data = parse_content_map('content_map.txt')
        md_file = generate_markdown_content('one_pager_template.md', content_data)
        convert_md_to_pdf(md_file, "tryonyou_one_pager.pdf")
        
        # Generar la plantilla editable para comerciales (es el archivo Markdown)
        print("Plantilla editable para comerciales: one_pager_template.md")
        
    except Exception as e:
        print(f"Error en el proceso de generación de PDF: {e}")

if __name__ == '__main__':
    update_pdf()
