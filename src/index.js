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

class TryonApp {
    constructor() {
        this.modules = {};
        this.apiClient = new ApiClient();
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

            // Setup event listeners
            this.setupEventListeners();

            console.log('✅ TRYONYOU Application initialized successfully!');
            
            // Start the application
            this.start();
        } catch (error) {
            console.error('❌ Failed to initialize TRYONYOU Application:', error);
        }
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
                    </header>
                    <main class="app-main">
                        <div id="avatar-container"></div>
                        <div id="wardrobe-container"></div>
                        <div id="recommendations-container"></div>
                    </main>
                </div>
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
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.TryonApp = new TryonApp();
});

export default TryonApp;
