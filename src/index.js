/**
 * TRYONME-TRYONYOU-ABVETOS-INTELLIGENCE-SYSTEM
 * Main Entry Point
 * 
 * This is the main entry point for the TRYONYOU application.
 * It initializes all the core modules and sets up the application.
 */

import { Avatar3D } from './modules/avatar3D.js';
import { ComparadorTextil } from './modules/comparadorTextil.js';
import { RecomendadorPAU } from './modules/recomendadorPAU.js';
import { PagoAVBET } from './modules/pagoAVBET.js';
import { AutoDonate } from './modules/autoDonate.js';
import { BotsInternos } from './modules/botsInternos.js';
import { ApiClient } from './utils/apiClient.js';
import { InfoAggregator } from './utils/infoAggregator.js';

class TryonApp {
    constructor() {
        this.modules = {};
        this.apiClient = new ApiClient();
        this.infoAggregator = new InfoAggregator();
        this.init();
    }

    async init() {
        console.log('🚀 Initializing TRYONYOU Application...');
        
        try {
            // Initialize core modules
            this.modules.avatar3D = new Avatar3D();
            this.modules.comparadorTextil = new ComparadorTextil();
            this.modules.recomendadorPAU = new RecomendadorPAU();
            this.modules.pagoAVBET = new PagoAVBET();
            this.modules.autoDonate = new AutoDonate();
            this.modules.botsInternos = new BotsInternos();

            // Initialize API connections
            await this.apiClient.init();

            // Register modules with info aggregator
            this.registerModulesWithAggregator();

            // Setup event listeners
            this.setupEventListeners();

            console.log('✅ TRYONYOU Application initialized successfully!');
            
            // Start the application
            this.start();
        } catch (error) {
            console.error('❌ Failed to initialize TRYONYOU Application:', error);
        }
    }

    registerModulesWithAggregator() {
        // Register all modules with the info aggregator
        this.infoAggregator.registerModule('avatar3D', this.modules.avatar3D);
        this.infoAggregator.registerModule('comparadorTextil', this.modules.comparadorTextil);
        this.infoAggregator.registerModule('recomendadorPAU', this.modules.recomendadorPAU);
        this.infoAggregator.registerModule('pagoAVBET', this.modules.pagoAVBET);
        this.infoAggregator.registerModule('autoDonate', this.modules.autoDonate);
        this.infoAggregator.registerModule('botsInternos', this.modules.botsInternos);
        this.infoAggregator.registerModule('apiClient', this.apiClient);
        
        console.log('📊 All modules registered with InfoAggregator');
    }

    setupEventListeners() {
        // Global event listeners for the application
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    }

    handleResize() {
        // Handle window resize events
        if (this.modules.avatar3D) {
            this.modules.avatar3D.handleResize();
        }
    }

    handleBeforeUnload() {
        // Cleanup before page unload
        console.log('🧹 Cleaning up TRYONYOU Application...');
        Object.values(this.modules).forEach(module => {
            if (module.cleanup) {
                module.cleanup();
            }
        });
        
        // Cleanup info aggregator
        if (this.infoAggregator) {
            this.infoAggregator.cleanup();
        }
    }

    start() {
        // Start the main application loop
        console.log('🎯 Starting TRYONYOU Application...');
        
        // Initialize the user interface
        this.initUI();
        
        // Start background processes
        this.startBackgroundProcesses();
    }

    initUI() {
        // Initialize the user interface
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = `
                <div class="tryonyou-app">
                    <header class="app-header">
                        <h1>TRYONYOU - The Future of Fashion</h1>
                        <div class="info-controls">
                            <button id="get-all-info-btn">Get All Important Info</button>
                            <button id="get-system-status-btn">System Status</button>
                            <button id="export-summary-btn">Export Summary</button>
                        </div>
                    </header>
                    <main class="app-main">
                        <div id="info-display" class="info-panel">
                            <h2>System Information</h2>
                            <p>Click "Get All Important Info" to retrieve comprehensive system information.</p>
                        </div>
                        <div class="module-containers">
                            <div id="avatar-container"></div>
                            <div id="wardrobe-container"></div>
                            <div id="recommendations-container"></div>
                        </div>
                    </main>
                </div>
            `;

            // Add event listeners for info buttons
            this.setupInfoButtonListeners();
        }
    }

    setupInfoButtonListeners() {
        const getAllInfoBtn = document.getElementById('get-all-info-btn');
        const getSystemStatusBtn = document.getElementById('get-system-status-btn');
        const exportSummaryBtn = document.getElementById('export-summary-btn');
        const infoDisplay = document.getElementById('info-display');

        if (getAllInfoBtn) {
            getAllInfoBtn.addEventListener('click', () => {
                const info = this.getAllImportantInfo();
                this.displayInfo('Complete System Information', JSON.stringify(info, null, 2));
            });
        }

        if (getSystemStatusBtn) {
            getSystemStatusBtn.addEventListener('click', () => {
                const status = this.getSystemStatus();
                this.displayInfo('System Status', JSON.stringify(status, null, 2));
            });
        }

        if (exportSummaryBtn) {
            exportSummaryBtn.addEventListener('click', () => {
                const summary = this.getImportantInfoFormatted('summary');
                this.displayInfo('System Summary', summary, 'text');
            });
        }
    }

    displayInfo(title, content, format = 'json') {
        const infoDisplay = document.getElementById('info-display');
        if (infoDisplay) {
            const formatClass = format === 'text' ? 'text-format' : 'json-format';
            infoDisplay.innerHTML = `
                <h2>${title}</h2>
                <div class="info-timestamp">Generated: ${new Date().toLocaleString()}</div>
                <pre class="${formatClass}">${content}</pre>
            `;
        }
    }

    startBackgroundProcesses() {
        // Start background processes for intelligent agents
        if (this.modules.botsInternos) {
            this.modules.botsInternos.startAgents();
        }
    }

    // Public API methods
    getModule(moduleName) {
        return this.modules[moduleName];
    }

    getApiClient() {
        return this.apiClient;
    }

    // New method to get all important information from modules
    getAllImportantInfo(format = 'json') {
        console.log('🔍 Retrieving all important information from modules...');
        return this.infoAggregator.getAllImportantInfo();
    }

    // Get information in different formats
    getImportantInfoFormatted(format = 'json') {
        return this.infoAggregator.exportAggregatedData(format);
    }

    // Get real-time system status
    getSystemStatus() {
        const aggregatedInfo = this.infoAggregator.getAllImportantInfo();
        return {
            status: aggregatedInfo.systemStatus,
            summary: aggregatedInfo.summary,
            performance: aggregatedInfo.performance,
            timestamp: aggregatedInfo.timestamp
        };
    }

    // Get module-specific information
    getModuleInfo(moduleName) {
        const allInfo = this.infoAggregator.getAllImportantInfo();
        return allInfo.moduleInfo[moduleName] || null;
    }

    // Get real-time updates
    getRealtimeUpdates() {
        return this.infoAggregator.getRealtimeUpdates();
    }
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.TryonApp = new TryonApp();
});

export default TryonApp;
