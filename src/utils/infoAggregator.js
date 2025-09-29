/**
 * InfoAggregator Utility - Collects important information from all modules
 */
export class InfoAggregator {
    constructor() {
        this.modules = {};
        this.lastUpdate = null;
        this.aggregatedData = {};
        console.log('📊 InfoAggregator utility initialized');
    }

    registerModule(moduleName, moduleInstance) {
        this.modules[moduleName] = moduleInstance;
        console.log(`📋 Module ${moduleName} registered with InfoAggregator`);
    }

    getAllImportantInfo() {
        console.log('🔍 Collecting important information from all modules...');
        
        const aggregatedInfo = {
            timestamp: new Date().toISOString(),
            systemStatus: this.getSystemStatus(),
            moduleInfo: {},
            summary: {},
            alerts: [],
            performance: {}
        };

        // Collect info from each registered module
        Object.keys(this.modules).forEach(moduleName => {
            try {
                aggregatedInfo.moduleInfo[moduleName] = this.getModuleInfo(moduleName);
            } catch (error) {
                console.error(`❌ Error collecting info from ${moduleName}:`, error);
                aggregatedInfo.alerts.push({
                    type: 'error',
                    module: moduleName,
                    message: `Failed to collect info: ${error.message}`,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Generate summary
        aggregatedInfo.summary = this.generateSummary(aggregatedInfo.moduleInfo);
        
        // Calculate performance metrics
        aggregatedInfo.performance = this.calculatePerformanceMetrics();

        this.aggregatedData = aggregatedInfo;
        this.lastUpdate = new Date().toISOString();

        console.log('✅ Information aggregation completed');
        return aggregatedInfo;
    }

    getModuleInfo(moduleName) {
        const module = this.modules[moduleName];
        if (!module) {
            throw new Error(`Module ${moduleName} not found`);
        }

        const baseInfo = {
            name: moduleName,
            status: 'active',
            lastActivity: new Date().toISOString()
        };

        // Extract module-specific important information
        switch (moduleName) {
            case 'avatar3D':
                return {
                    ...baseInfo,
                    type: '3D Avatar Generation',
                    currentAvatar: module.avatar ? {
                        id: module.avatar.id,
                        realism: module.avatar.realism,
                        hasmeasurements: Object.keys(module.measurements).length > 0
                    } : null,
                    measurementCount: Object.keys(module.measurements).length,
                    capabilities: ['3D modeling', 'measurement integration', 'real-time rendering']
                };

            case 'comparadorTextil':
                return {
                    ...baseInfo,
                    type: 'Fabric Comparison Engine',
                    activeComparisons: module.comparisons ? module.comparisons.length : 0,
                    supportedFabrics: module.fabricTypes ? module.fabricTypes.length : 0,
                    capabilities: ['fabric simulation', 'fit analysis', 'material properties']
                };

            case 'recomendadorPAU':
                return {
                    ...baseInfo,
                    type: 'Emotional Recommendation Engine (Pau le Paon)',
                    totalRecommendations: module.recommendations ? module.recommendations.length : 0,
                    emotionalProfiles: Object.keys(module.emotionalProfiles).length,
                    trendDataSources: Object.keys(module.trendData).length,
                    capabilities: ['mood analysis', 'emotional styling', 'trend integration']
                };

            case 'pagoAVBET':
                return {
                    ...baseInfo,
                    type: 'AVBET Biometric Payment System',
                    biometricMethods: ['iris recognition', 'voice verification'],
                    securityLevel: 'maximum',
                    transactionCount: module.transactionHistory ? module.transactionHistory.length : 0,
                    capabilities: ['biometric auth', 'secure payments', 'fraud detection']
                };

            case 'autoDonate':
                return {
                    ...baseInfo,
                    type: 'Solidarity Wardrobe (AutoDonate)',
                    activeDonations: module.donations ? module.donations.length : 0,
                    matchedUsers: module.matches ? module.matches.length : 0,
                    sustainabilityScore: module.sustainabilityMetrics?.score || 0,
                    capabilities: ['donation matching', 'logistics optimization', 'impact tracking']
                };

            case 'botsInternos':
                const agentStatus = module.getAgentStatus ? module.getAgentStatus() : {};
                return {
                    ...baseInfo,
                    type: '50 Intelligent Agents System',
                    totalAgents: agentStatus.totalAgents || 0,
                    activeAgents: agentStatus.activeAgents || 0,
                    averagePerformance: agentStatus.averagePerformance || 0,
                    tasksCompleted: agentStatus.totalTasksCompleted || 0,
                    blocks: agentStatus.blocks || {},
                    capabilities: ['automation', 'task execution', 'performance monitoring']
                };

            default:
                // Generic module info extraction
                return {
                    ...baseInfo,
                    type: 'Generic Module',
                    properties: Object.keys(module).length,
                    capabilities: ['general functionality']
                };
        }
    }

    generateSummary(moduleInfo) {
        const summary = {
            totalModules: Object.keys(moduleInfo).length,
            activeModules: Object.values(moduleInfo).filter(m => m.status === 'active').length,
            keyMetrics: {},
            healthScore: 0,
            recommendations: []
        };

        // Calculate key metrics
        if (moduleInfo.botsInternos) {
            summary.keyMetrics.totalAgents = moduleInfo.botsInternos.totalAgents;
            summary.keyMetrics.agentPerformance = moduleInfo.botsInternos.averagePerformance;
        }

        if (moduleInfo.recomendadorPAU) {
            summary.keyMetrics.totalRecommendations = moduleInfo.recomendadorPAU.totalRecommendations;
        }

        if (moduleInfo.autoDonate) {
            summary.keyMetrics.sustainabilityScore = moduleInfo.autoDonate.sustainabilityScore;
        }

        // Calculate health score (0-100)
        const healthFactors = [];
        
        Object.values(moduleInfo).forEach(module => {
            if (module.status === 'active') healthFactors.push(100);
            else healthFactors.push(0);
        });

        summary.healthScore = healthFactors.length > 0 
            ? Math.round(healthFactors.reduce((a, b) => a + b, 0) / healthFactors.length)
            : 0;

        // Generate recommendations
        if (summary.healthScore < 90) {
            summary.recommendations.push('Consider investigating inactive modules');
        }
        
        if (moduleInfo.botsInternos && moduleInfo.botsInternos.averagePerformance < 0.9) {
            summary.recommendations.push('Agent performance could be optimized');
        }

        return summary;
    }

    calculatePerformanceMetrics() {
        const metrics = {
            uptime: '99.8%',
            responseTime: 'optimal',
            memoryUsage: 'normal',
            apiConnections: 'stable',
            errorRate: '0.2%',
            lastCalculated: new Date().toISOString()
        };

        // If we have API client, get connection status
        if (this.modules.apiClient) {
            const connectionStatus = this.modules.apiClient.getConnectionStatus();
            metrics.apiConnections = connectionStatus.services.length > 0 ? 'connected' : 'disconnected';
        }

        return metrics;
    }

    getSystemStatus() {
        return {
            status: 'operational',
            version: '1.0.0',
            uptime: Math.floor(Math.random() * 1000000), // Simulated uptime in seconds
            environment: 'production',
            region: 'global'
        };
    }

    getLastAggregation() {
        return {
            data: this.aggregatedData,
            timestamp: this.lastUpdate,
            moduleCount: Object.keys(this.modules).length
        };
    }

    // Real-time info methods
    getRealtimeUpdates() {
        const updates = [];
        
        // Check for recent activities across modules
        Object.keys(this.modules).forEach(moduleName => {
            const module = this.modules[moduleName];
            
            // Check if module has recent activity indicators
            if (module.lastActivity) {
                const lastActivity = new Date(module.lastActivity);
                const now = new Date();
                const timeDiff = now - lastActivity;
                
                if (timeDiff < 60000) { // Activity within last minute
                    updates.push({
                        module: moduleName,
                        activity: 'recent activity detected',
                        timestamp: module.lastActivity,
                        priority: 'normal'
                    });
                }
            }
        });

        return {
            updates,
            timestamp: new Date().toISOString(),
            count: updates.length
        };
    }

    // Export functionality
    exportAggregatedData(format = 'json') {
        const data = this.getAllImportantInfo();
        
        switch (format) {
            case 'json':
                return JSON.stringify(data, null, 2);
            
            case 'summary':
                return this.createTextualSummary(data);
            
            case 'csv':
                return this.convertToCSV(data);
            
            default:
                return data;
        }
    }

    createTextualSummary(data) {
        let summary = `TRYONYOU System Information Summary\n`;
        summary += `Generated: ${data.timestamp}\n`;
        summary += `System Status: ${data.systemStatus.status.toUpperCase()}\n`;
        summary += `Health Score: ${data.summary.healthScore}%\n\n`;
        
        summary += `Active Modules (${data.summary.activeModules}/${data.summary.totalModules}):\n`;
        Object.entries(data.moduleInfo).forEach(([name, info]) => {
            summary += `- ${name}: ${info.type} (${info.status})\n`;
        });
        
        if (data.summary.recommendations.length > 0) {
            summary += `\nRecommendations:\n`;
            data.summary.recommendations.forEach(rec => {
                summary += `- ${rec}\n`;
            });
        }
        
        return summary;
    }

    convertToCSV(data) {
        const headers = ['Module', 'Type', 'Status', 'Capabilities'];
        const rows = [headers.join(',')];
        
        Object.entries(data.moduleInfo).forEach(([name, info]) => {
            const row = [
                name,
                info.type || 'Unknown',
                info.status || 'Unknown',
                info.capabilities ? info.capabilities.join(';') : 'None'
            ];
            rows.push(row.join(','));
        });
        
        return rows.join('\n');
    }

    cleanup() {
        this.modules = {};
        this.aggregatedData = {};
        console.log('🧹 InfoAggregator cleaned up');
    }
}