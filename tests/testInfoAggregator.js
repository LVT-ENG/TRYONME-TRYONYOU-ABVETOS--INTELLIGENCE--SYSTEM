/**
 * Test file for InfoAggregator functionality
 */
import { InfoAggregator } from '../src/utils/infoAggregator.js';
import { Avatar3D } from '../src/modules/avatar3D.js';
import { BotsInternos } from '../src/modules/botsInternos.js';
import { RecomendadorPAU } from '../src/modules/recomendadorPAU.js';

// Mock console to capture logs during tests
const originalLog = console.log;
let testLogs = [];
console.log = (...args) => {
    testLogs.push(args.join(' '));
    originalLog(...args);
};

function runTests() {
    console.log('🧪 Starting InfoAggregator Tests...\n');

    // Test 1: Initialize InfoAggregator
    test('InfoAggregator Initialization', () => {
        const aggregator = new InfoAggregator();
        assert(aggregator instanceof InfoAggregator, 'InfoAggregator should be instantiated');
        assert(typeof aggregator.modules === 'object', 'Should have modules object');
        assert(typeof aggregator.getAllImportantInfo === 'function', 'Should have getAllImportantInfo method');
    });

    // Test 2: Register modules
    test('Module Registration', () => {
        const aggregator = new InfoAggregator();
        const avatar3D = new Avatar3D();
        const botsInternos = new BotsInternos();
        
        aggregator.registerModule('avatar3D', avatar3D);
        aggregator.registerModule('botsInternos', botsInternos);
        
        assert(Object.keys(aggregator.modules).length === 2, 'Should have 2 registered modules');
        assert(aggregator.modules.avatar3D === avatar3D, 'Avatar3D should be registered');
        assert(aggregator.modules.botsInternos === botsInternos, 'BotsInternos should be registered');
    });

    // Test 3: Collect information from modules
    test('Information Collection', () => {
        const aggregator = new InfoAggregator();
        const avatar3D = new Avatar3D();
        const botsInternos = new BotsInternos();
        const recomendador = new RecomendadorPAU();
        
        // Generate some test data
        avatar3D.generateAvatar({ height: 170, weight: 65, chest: 90 });
        botsInternos.startAgents();
        recomendador.analyzeUserMood({ text: 'I feel great today!' });
        
        aggregator.registerModule('avatar3D', avatar3D);
        aggregator.registerModule('botsInternos', botsInternos);
        aggregator.registerModule('recomendadorPAU', recomendador);
        
        const info = aggregator.getAllImportantInfo();
        
        assert(typeof info === 'object', 'Should return an object');
        assert(info.timestamp, 'Should have timestamp');
        assert(info.systemStatus, 'Should have system status');
        assert(info.moduleInfo, 'Should have module info');
        assert(info.summary, 'Should have summary');
        
        // Check specific module info
        assert(info.moduleInfo.avatar3D, 'Should have Avatar3D info');
        assert(info.moduleInfo.botsInternos, 'Should have BotsInternos info');
        assert(info.moduleInfo.recomendadorPAU, 'Should have RecomendadorPAU info');
        
        // Check Avatar3D specific data
        assert(info.moduleInfo.avatar3D.currentAvatar, 'Avatar3D should have current avatar');
        assert(info.moduleInfo.avatar3D.measurementCount === 3, 'Should have 3 measurements');
        
        // Check BotsInternos specific data
        assert(info.moduleInfo.botsInternos.totalAgents === 50, 'Should have 50 agents');
        assert(info.moduleInfo.botsInternos.activeAgents === 50, 'Should have 50 active agents');
    });

    // Test 4: Export functionality
    test('Export Functionality', () => {
        const aggregator = new InfoAggregator();
        const avatar3D = new Avatar3D();
        
        aggregator.registerModule('avatar3D', avatar3D);
        
        // Test JSON export
        const jsonExport = aggregator.exportAggregatedData('json');
        assert(typeof jsonExport === 'string', 'JSON export should be string');
        assert(jsonExport.includes('avatar3D'), 'JSON export should contain module info');
        
        // Test summary export
        const summaryExport = aggregator.exportAggregatedData('summary');
        assert(typeof summaryExport === 'string', 'Summary export should be string');
        assert(summaryExport.includes('TRYONYOU System Information Summary'), 'Summary should have title');
        
        // Test CSV export
        const csvExport = aggregator.exportAggregatedData('csv');
        assert(typeof csvExport === 'string', 'CSV export should be string');
        assert(csvExport.includes('Module,Type,Status,Capabilities'), 'CSV should have headers');
    });

    // Test 5: Real-time updates
    test('Real-time Updates', () => {
        const aggregator = new InfoAggregator();
        const avatar3D = new Avatar3D();
        
        // Set recent activity
        avatar3D.lastActivity = new Date().toISOString();
        
        aggregator.registerModule('avatar3D', avatar3D);
        
        const updates = aggregator.getRealtimeUpdates();
        
        assert(typeof updates === 'object', 'Should return updates object');
        assert(Array.isArray(updates.updates), 'Should have updates array');
        assert(updates.timestamp, 'Should have timestamp');
        assert(typeof updates.count === 'number', 'Should have count');
    });

    // Test 6: System status
    test('System Status', () => {
        const aggregator = new InfoAggregator();
        const info = aggregator.getAllImportantInfo();
        
        assert(info.systemStatus.status === 'operational', 'System should be operational');
        assert(info.systemStatus.version === '1.0.0', 'Should have version');
        assert(typeof info.systemStatus.uptime === 'number', 'Should have uptime');
    });

    // Test 7: Health score calculation
    test('Health Score Calculation', () => {
        const aggregator = new InfoAggregator();
        const avatar3D = new Avatar3D();
        const botsInternos = new BotsInternos();
        
        aggregator.registerModule('avatar3D', avatar3D);
        aggregator.registerModule('botsInternos', botsInternos);
        
        const info = aggregator.getAllImportantInfo();
        
        assert(typeof info.summary.healthScore === 'number', 'Health score should be a number');
        assert(info.summary.healthScore >= 0 && info.summary.healthScore <= 100, 'Health score should be between 0-100');
        assert(info.summary.totalModules === 2, 'Should count modules correctly');
        assert(info.summary.activeModules === 2, 'Should count active modules correctly');
    });

    console.log('\n✅ All InfoAggregator tests passed!');
}

// Simple test helper functions
function test(name, testFunction) {
    try {
        console.log(`\n🔍 Testing: ${name}`);
        testFunction();
        console.log(`✅ ${name} - PASSED`);
    } catch (error) {
        console.error(`❌ ${name} - FAILED:`, error.message);
        throw error;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
    // Node.js environment
    runTests();
} else {
    // Browser environment - expose test function
    window.runInfoAggregatorTests = runTests;
}

export { runTests as runInfoAggregatorTests };