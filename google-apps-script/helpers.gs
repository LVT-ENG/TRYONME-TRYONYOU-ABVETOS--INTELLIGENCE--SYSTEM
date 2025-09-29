/**
 * TryOnMe Motor - Helper Functions
 * Funciones auxiliares para el sistema de recomendaciones
 */

/**
 * Añade validación de lista a un rango de celdas
 * @param {Sheet} sheet - La hoja donde aplicar la validación
 * @param {string} range - El rango de celdas (ej: "D2:D1000")
 * @param {string} listRange - El rango de la lista de validación (ej: "Lists!E2:E100")
 */
function addListValidation(sheet, range, listRange) {
  try {
    const targetRange = sheet.getRange(range);
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(SpreadsheetApp.getActiveSpreadsheet().getRange(listRange))
      .setAllowInvalid(false)
      .setHelpText('Selecciona un valor de la lista')
      .build();
    targetRange.setDataValidation(rule);
  } catch (error) {
    console.error(`Error al añadir validación en ${range}:`, error);
  }
}

/**
 * Configura el formato de una hoja con encabezados
 * @param {Sheet} sheet - La hoja a formatear
 * @param {Array} headers - Array con los nombres de las columnas
 * @param {number} columnWidth - Ancho de las columnas (opcional, por defecto 160)
 */
function setupSheetHeaders(sheet, headers, columnWidth = 160) {
  // Configurar encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold")
    .setBackground("#eeeeee");
  
  // Congelar primera fila
  sheet.setFrozenRows(1);
  
  // Establecer ancho de columnas
  sheet.setColumnWidths(1, headers.length, columnWidth);
}

/**
 * Calcula recomendaciones basadas en preferencias del usuario
 * @param {Object} usuario - Datos del usuario
 * @param {Array} tendencias - Lista de tendencias actuales
 * @param {Object} reglas - Configuración de pesos y cuotas
 * @return {Array} Lista de recomendaciones
 */
function calcularRecomendaciones(usuario, tendencias, reglas) {
  const recomendaciones = [];
  
  // Algoritmo básico de recomendación
  // Aquí se implementaría la lógica de matching según los pesos definidos en reglas
  
  // Ejemplo de estructura de recomendación
  const recomendacionBase = {
    user_id: usuario.user_id,
    producto_id: '',
    nombre_producto: '',
    marca: '',
    categoria: '',
    estilo: '',
    color: '',
    talla_recomendada: '',
    precio: 0,
    score_preferencias: 0,
    score_tendencias: 0,
    score_fitting: 0,
    score_total: 0,
    fuente: '',
    url_producto: '',
    imagen_url: '',
    motivo_recomendacion: '',
    fecha_generacion: new Date()
  };
  
  return recomendaciones;
}

/**
 * Genera datos de ejemplo para testing
 * @param {number} cantidad - Número de registros a generar
 * @return {Array} Array de datos de ejemplo
 */
function generarDatosEjemplo(cantidad = 5) {
  const datos = [];
  const estilos = ["Elegante / Chic", "Minimalista", "Casual / Informal", "Streetwear / Urbano"];
  const colores = ["Negro", "Blanco", "Azul marino", "Beige"];
  const marcas = ["Zara", "H&M", "Mango", "Pull&Bear", "Bershka"];
  
  for (let i = 1; i <= cantidad; i++) {
    datos.push({
      id: `prod_${String(i).padStart(4, '0')}`,
      nombre: `Producto Ejemplo ${i}`,
      marca: marcas[Math.floor(Math.random() * marcas.length)],
      estilo: estilos[Math.floor(Math.random() * estilos.length)],
      color: colores[Math.floor(Math.random() * colores.length)],
      precio: Math.floor(Math.random() * 100) + 20
    });
  }
  
  return datos;
}