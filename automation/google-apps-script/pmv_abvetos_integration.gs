/**
 * PMV + ABVETOS Core Integration
 * Sincroniza el registro de agentes con la hoja "Dashboard"
 * 
 * This script integrates with the existing dailyPlanner.gs to provide
 * agent synchronization capabilities for the TRYONYOU platform.
 * 
 * Setup Instructions:
 * 1. Copy this script to your Google Apps Script project
 * 2. Update the REGISTRY_URL if using a different location
 * 3. The onOpen() function will add a menu to sync agents
 * 4. Run pmv_syncAgents() manually or set up a daily trigger
 */

const REGISTRY_URL = 'https://tryonyou.app/data/agents_registry.json'; // or Drive path if preferred
const DASHBOARD_SHEET = 'Dashboard';

/**
 * Importa los agentes activos al Dashboard PMV
 * Synchronizes active agents from the registry to the Dashboard sheet
 */
function pmv_syncAgents() {
  try {
    const sh = SpreadsheetApp.getActive().getSheetByName(DASHBOARD_SHEET);
    
    if (!sh) {
      Logger.log('ERROR: Sheet "' + DASHBOARD_SHEET + '" not found');
      return;
    }
    
    // Fetch the agents registry
    const resp = UrlFetchApp.fetch(REGISTRY_URL);
    const registry = JSON.parse(resp.getContentText());
    const activeAgents = registry.active || [];
    
    if (activeAgents.length === 0) {
      Logger.log('WARNING: No active agents found in registry');
      return;
    }
    
    // Get header row and create column index
    const header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    const idx = Object.fromEntries(header.map((h, i) => [h, i + 1]));
    
    // Verify required columns exist
    const requiredColumns = ['ID', 'Tarea', 'Responsable', 'Prioridad', 'Fecha de entrega', 'Estado', 'Etiquetas', 'Nota', 'Última actualización'];
    const missingColumns = requiredColumns.filter(col => !idx[col]);
    
    if (missingColumns.length > 0) {
      Logger.log('ERROR: Missing required columns: ' + missingColumns.join(', '));
      return;
    }
    
    const lastRow = sh.getLastRow();
    const now = Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd');
    const base = Math.max(lastRow + 1, 2);
    
    // Add each active agent to the Dashboard
    activeAgents.forEach((agent, i) => {
      const row = base + i;
      sh.getRange(row, idx['ID']).setValue(agent.id);
      sh.getRange(row, idx['Tarea']).setValue(agent.name + ' – Sincronizado');
      sh.getRange(row, idx['Responsable']).setValue(agent.name);
      sh.getRange(row, idx['Prioridad']).setValue('P1');
      sh.getRange(row, idx['Fecha de entrega']).setValue(now);
      sh.getRange(row, idx['Estado']).setValue('Por hacer');
      sh.getRange(row, idx['Etiquetas']).setValue('agent-sync');
      sh.getRange(row, idx['Nota']).setValue(agent.role);
      sh.getRange(row, idx['Última actualización']).setValue(now);
    });
    
    Logger.log('SUCCESS: Synchronized ' + activeAgents.length + ' active agents to Dashboard');
    
  } catch (error) {
    Logger.log('ERROR in pmv_syncAgents: ' + error.toString());
  }
}

/**
 * Archives agents that have been moved to backstage status
 * Updates their status to "Hecha" and adds "archivado" tag
 */
function pmv_archiveBackstageAgents() {
  try {
    const sh = SpreadsheetApp.getActive().getSheetByName(DASHBOARD_SHEET);
    
    if (!sh) {
      Logger.log('ERROR: Sheet "' + DASHBOARD_SHEET + '" not found');
      return;
    }
    
    // Fetch the agents registry
    const resp = UrlFetchApp.fetch(REGISTRY_URL);
    const registry = JSON.parse(resp.getContentText());
    const backstageAgents = registry.backstage || [];
    
    if (backstageAgents.length === 0) {
      Logger.log('INFO: No backstage agents to archive');
      return;
    }
    
    // Get all data from sheet
    const values = sh.getDataRange().getValues();
    const header = values[0];
    const idx = Object.fromEntries(header.map((h, i) => [h, i]));
    
    let archivedCount = 0;
    const backstageIds = backstageAgents.map(agent => agent.id);
    
    // Iterate through rows and update backstage agents
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const agentId = row[idx['ID']];
      
      if (backstageIds.includes(agentId)) {
        const rowNumber = i + 1;
        sh.getRange(rowNumber, idx['Estado'] + 1).setValue('Hecha');
        
        // Add "archivado" to tags if not already present
        const currentTags = row[idx['Etiquetas']] || '';
        if (!currentTags.includes('archivado')) {
          const newTags = currentTags ? currentTags + ', archivado' : 'archivado';
          sh.getRange(rowNumber, idx['Etiquetas'] + 1).setValue(newTags);
        }
        
        archivedCount++;
      }
    }
    
    Logger.log('SUCCESS: Archived ' + archivedCount + ' backstage agents');
    
  } catch (error) {
    Logger.log('ERROR in pmv_archiveBackstageAgents: ' + error.toString());
  }
}

/**
 * Full synchronization: sync active agents and archive backstage ones
 */
function pmv_fullSync() {
  Logger.log('Starting full synchronization...');
  pmv_syncAgents();
  pmv_archiveBackstageAgents();
  Logger.log('Full synchronization completed');
}

/**
 * Creates a daily trigger for agent synchronization
 * Run this function ONCE to set up automatic daily sync at 09:00
 */
function pmv_createSyncTrigger() {
  // Delete existing sync triggers first
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'pmv_fullSync') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new daily trigger at 09:00
  ScriptApp.newTrigger('pmv_fullSync')
    .timeBased()
    .atHour(9)
    .everyDays(1)
    .create();
  
  Logger.log('Daily sync trigger created successfully');
}

/**
 * Muestra menú de sincronización de agentes
 * Extends the existing onOpen menu with agent sync options
 * 
 * IMPORTANT: If you already have an onOpen() function in dailyPlanner.gs,
 * merge these menu items with your existing menu instead of creating a new one.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('PMV')
    .addItem('Sincronizar con Calendar', 'pmv_syncCalendar')
    .addItem('Enviar resumen diario ahora', 'pmv_dailyDigest')
    .addSeparator()
    .addItem('Sincronizar agentes activos', 'pmv_syncAgents')
    .addItem('Archivar agentes backstage', 'pmv_archiveBackstageAgents')
    .addItem('Sincronización completa', 'pmv_fullSync')
    .addSeparator()
    .addItem('Configurar sincronización diaria', 'pmv_createSyncTrigger')
    .addToUi();
}

/**
 * Test function to verify the integration is working
 */
function pmv_testIntegration() {
  Logger.log('=== Testing PMV + ABVETOS Integration ===');
  
  try {
    // Test registry fetch
    Logger.log('Testing registry fetch...');
    const resp = UrlFetchApp.fetch(REGISTRY_URL);
    const registry = JSON.parse(resp.getContentText());
    Logger.log('SUCCESS: Registry fetched. Active agents: ' + registry.active.length);
    
    // Test sheet access
    Logger.log('Testing sheet access...');
    const sh = SpreadsheetApp.getActive().getSheetByName(DASHBOARD_SHEET);
    if (sh) {
      Logger.log('SUCCESS: Dashboard sheet found');
      const header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
      Logger.log('Columns found: ' + header.join(', '));
    } else {
      Logger.log('ERROR: Dashboard sheet not found');
    }
    
    Logger.log('=== Test completed ===');
    
  } catch (error) {
    Logger.log('ERROR in test: ' + error.toString());
  }
}

/**
 * Utility function to view current agent sync status
 */
function pmv_viewSyncStatus() {
  try {
    const sh = SpreadsheetApp.getActive().getSheetByName(DASHBOARD_SHEET);
    const values = sh.getDataRange().getValues();
    const header = values[0];
    const idx = Object.fromEntries(header.map((h, i) => [h, i]));
    
    let syncedCount = 0;
    let archivedCount = 0;
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const tags = row[idx['Etiquetas']] || '';
      
      if (tags.includes('agent-sync')) {
        syncedCount++;
        if (tags.includes('archivado')) {
          archivedCount++;
        }
      }
    }
    
    Logger.log('=== Agent Sync Status ===');
    Logger.log('Total synced agents: ' + syncedCount);
    Logger.log('Active agents: ' + (syncedCount - archivedCount));
    Logger.log('Archived agents: ' + archivedCount);
    
  } catch (error) {
    Logger.log('ERROR in pmv_viewSyncStatus: ' + error.toString());
  }
}
