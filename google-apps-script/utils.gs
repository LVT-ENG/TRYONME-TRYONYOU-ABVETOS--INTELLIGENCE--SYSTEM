/**
 * Script de utilidades para el sistema TryOnMe
 * Funciones adicionales para mantenimiento y testing
 */

/**
 * Función para limpiar y reinicializar completamente el sistema
 */
function resetTryOnMe() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Reiniciar Sistema',
    '¿Estás seguro de que quieres reinicializar el sistema?\n\nEsto borrará todos los datos existentes.',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    initTryOnMe();
  }
}

/**
 * Función para poblar el sistema con datos de prueba
 */
function populateTestData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    // Datos de prueba para Usuarios
    const usuarios = ss.getSheetByName('Usuarios');
    if (usuarios) {
      const testUsers = [
        ["u_0002","Ana García","ana@email.com","Mujer",25,165,55,"Madrid","España","Templado","Minimalista","Elegante / Chic","Casual / Informal","Blanco","Negro","Vestido","Chaqueta","Regular","Sí", new Date()],
        ["u_0003","Carlos López","carlos@email.com","Hombre",30,180,75,"Barcelona","España","Templado","Streetwear / Urbano","Casual / Informal","Deportivo / Athleisure","Negro","Azul marino","Camiseta","Pantalón","Slim","Sí", new Date()],
        ["u_0004","María Rodríguez","maria@email.com","Mujer",35,170,65,"Valencia","España","Cálido","Bohemio / Boho","Romántico","Vintage / Retro","Rosa","Beige","Falda","Camisa","Con vuelo","Sí", new Date()]
      ];
      usuarios.getRange(3, 1, testUsers.length, testUsers[0].length).setValues(testUsers);
    }
    
    // Datos de prueba para Medidas
    const medidas = ss.getSheetByName('Medidas');
    if (medidas) {
      const testMedidas = [
        ["u_0002", new Date(), 85, 65, 92, 98, 56, 38, "S", "scanner web"],
        ["u_0003", new Date(), 100, 85, 95, 105, 62, 45, "L", "medición manual"],
        ["u_0004", new Date(), 90, 70, 98, 102, 58, 40, "M", "scanner móvil"]
      ];
      medidas.getRange(3, 1, testMedidas.length, testMedidas[0].length).setValues(testMedidas);
    }
    
    // Datos de prueba para Tendencias
    const tendencias = ss.getSheetByName('Tendencias');
    if (tendencias) {
      const testTendencias = [
        [new Date(),"vestido midi 2025","midi dresses","https://trend1.com","trend1.com",2,8,15000,"fashion week"],
        [new Date(),"sneakers urbanos","urban sneakers","https://trend2.com","trend2.com",3,12,22000,"street style"],
        [new Date(),"blazer oversize mujer","oversized blazers","https://trend3.com","trend3.com",1,15,18000,"office wear"],
        [new Date(),"pantalon wide leg","wide leg pants","https://trend4.com","trend4.com",4,6,11000,"comfort trend"],
        [new Date(),"camisa satinada","satin shirts","https://trend5.com","trend5.com",5,9,13000,"evening wear"]
      ];
      tendencias.getRange(3, 1, testTendencias.length, testTendencias[0].length).setValues(testTendencias);
    }
    
    SpreadsheetApp.getUi().alert('Datos de prueba añadidos exitosamente');
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error al añadir datos de prueba: ' + error.toString());
  }
}

/**
 * Función para generar un reporte de estado del sistema
 */
function generateSystemReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  let report = "=== REPORTE DEL SISTEMA TRYONME ===\n\n";
  
  report += `Fecha del reporte: ${new Date().toLocaleString()}\n`;
  report += `Nombre del archivo: ${ss.getName()}\n\n`;
  
  report += "HOJAS CONFIGURADAS:\n";
  sheets.forEach(sheet => {
    const name = sheet.getName();
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    report += `• ${name}: ${lastRow} filas, ${lastCol} columnas\n`;
  });
  
  // Verificar hojas requeridas
  const requiredSheets = ['README', 'Lists', 'Usuarios', 'Medidas', 'Tendencias', 'Reglas', 'Recomendaciones'];
  const missingSheets = requiredSheets.filter(sheetName => !ss.getSheetByName(sheetName));
  
  if (missingSheets.length > 0) {
    report += `\n⚠️  HOJAS FALTANTES: ${missingSheets.join(', ')}\n`;
  } else {
    report += "\n✅ Todas las hojas requeridas están presentes\n";
  }
  
  // Contar registros de datos
  const usuarios = ss.getSheetByName('Usuarios');
  const medidas = ss.getSheetByName('Medidas');
  const tendencias = ss.getSheetByName('Tendencias');
  const recomendaciones = ss.getSheetByName('Recomendaciones');
  
  report += "\nDATOS ACTUALES:\n";
  if (usuarios) report += `• Usuarios registrados: ${Math.max(0, usuarios.getLastRow() - 1)}\n`;
  if (medidas) report += `• Registros de medidas: ${Math.max(0, medidas.getLastRow() - 1)}\n`;
  if (tendencias) report += `• Tendencias capturadas: ${Math.max(0, tendencias.getLastRow() - 1)}\n`;
  if (recomendaciones) report += `• Recomendaciones generadas: ${Math.max(0, recomendaciones.getLastRow() - 1)}\n`;
  
  console.log(report);
  SpreadsheetApp.getUi().alert('Reporte del Sistema', report, SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Función para validar la integridad del sistema
 */
function validateSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const errors = [];
  
  // Verificar hojas requeridas
  const requiredSheets = ['README', 'Lists', 'Usuarios', 'Medidas', 'Tendencias', 'Reglas', 'Recomendaciones'];
  requiredSheets.forEach(sheetName => {
    if (!ss.getSheetByName(sheetName)) {
      errors.push(`Hoja faltante: ${sheetName}`);
    }
  });
  
  // Verificar estructura de Lists
  const lists = ss.getSheetByName('Lists');
  if (lists) {
    const expectedLists = ['Styles', 'Colors', 'GarmentTypes', 'FitPreferences', 'Sex', 'OutputBuckets', 'Climate', 'Seasons'];
    expectedLists.forEach((listName, index) => {
      const headerValue = lists.getRange(1, index + 1).getValue();
      if (headerValue !== listName) {
        errors.push(`Lista incorrecta en columna ${index + 1}: esperado "${listName}", encontrado "${headerValue}"`);
      }
    });
  }
  
  if (errors.length === 0) {
    SpreadsheetApp.getUi().alert('✅ Sistema validado correctamente', 'No se encontraron errores en la estructura del sistema.', SpreadsheetApp.getUi().ButtonSet.OK);
  } else {
    const errorMessage = '❌ Se encontraron errores:\n\n' + errors.join('\n');
    SpreadsheetApp.getUi().alert('Errores de Validación', errorMessage, SpreadsheetApp.getUi().ButtonSet.OK);
  }
  
  return errors.length === 0;
}