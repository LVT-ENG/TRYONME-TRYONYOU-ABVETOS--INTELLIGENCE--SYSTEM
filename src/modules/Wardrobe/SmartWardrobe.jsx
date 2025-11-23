import React, { useState, useEffect, useCallback } from 'react';
// Importamos los 15 Componentes Core que ya integraste
import { 
    ComponentA, ComponentB, ComponentC, ComponentD, ComponentE,
    ComponentF, ComponentG, ComponentH, ComponentI, ComponentJ,
    ComponentK, ComponentL, ComponentM, ComponentN, ComponentO
} from './Wardrobe/CoreComponents';

// Definimos el componente principal del SmartWardrobe
const SmartWardrobe = () => {
    // --- LÓGICA DEL MANDATO ABVET #003: DATA-FETCHING ---
    
    // Estado para la data del inventario y el estado de la API
    const [inventoryData, setInventoryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);
    // Se inicializa en 'Status' para mostrar el estado de la API al cargar
    const [activeTab, setActiveTab] = useState('Status'); 

    // Función que simula la llamada a la API de Inventario
    const fetchInventoryData = useCallback(async () => {
        setIsLoading(true);
        setErrorState(null);
        setInventoryData(null);
        
        try {
            // Simulamos la llamada a la API (endpoint: /api/wardrobe/inventory)
            // Se usa setTimeout para simular la latencia de red
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            // SIMULACIÓN DE DATOS DE RESPUESTA EXITOSA
            const mockData = {
                status: 'success',
                itemCount: 85,
                lastSync: new Date().toISOString(),
                agentsActive: ['FTT', 'CAP', 'SolidaryWardrobeAgent', 'AutoFitAgent', 'MoodSyncAgent'],
            };
            
            setInventoryData(mockData);
        } catch (error) {
            console.error('API Error:', error);
            setErrorState('API_CONNECTION_FAILURE');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Hook para ejecutar el fetching al montar el componente
    useEffect(() => {
        fetchInventoryData();
    }, [fetchInventoryData]);

    // Lógica para renderizar los 15 componentes Core
    const renderCoreModules = () => (
        <div className="core-modules-list">
            <ComponentA />
            <ComponentB />
            <ComponentC />
            <ComponentD />
            <ComponentE />
            <ComponentF />
            <ComponentG />
            <ComponentH />
            <ComponentI />
            <ComponentJ />
            <ComponentK />
            <ComponentL />
            <ComponentM />
            <ComponentN />
            <ComponentO />
        </div>
    );
    
    // --- RENDERIZADO DEL COMPONENTE ---
    return (
        <div className="smart-wardrobe-container">
            <div className="tab-navigation">
                <button 
                    onClick={() => setActiveTab('CoreModules')}
                    className={activeTab === 'CoreModules' ? 'active' : ''}
                >
                    ⚙️ Core Modules
                </button>
                <button 
                    onClick={() => setActiveTab('Status')}
                    className={activeTab === 'Status' ? 'active' : ''}
                >
                    API Status
                </button>
            </div>
            
            {activeTab === 'Status' && (
                <div className="api-status-panel">
                    <h3>TRYONYOU Intelligence System Status</h3>
                    {isLoading && <p>Loading Data from ABVET API...</p>}
                    
                    {errorState && (
                        <p className="error-message">
                            ERROR: {errorState} - Check /api/wardrobe/inventory endpoint.
                        </p>
                    )}
                    
                    {inventoryData && (
                        <div>
                            <p>Inventory Items: {inventoryData.itemCount}</p>
                            <p>Last Sync: {new Date(inventoryData.lastSync).toLocaleTimeString()}</p>
                            <p>Active Agents: {inventoryData.agentsActive.join(', ')}</p>
                        </div>
                    )}
                    <button onClick={fetchInventoryData} disabled={isLoading}>
                        {isLoading ? 'SYNCING...' : 'FORCE SYNC INVENTORY'}
                    </button>
                </div>
            )}
            
            {activeTab === 'CoreModules' && renderCoreModules()}
        </div>
    );
};

export default SmartWardrobe;
