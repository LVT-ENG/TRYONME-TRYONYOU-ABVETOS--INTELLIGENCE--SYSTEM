// TRYONYOU Main Application Entry Point
// Exports all core modules for easy integration

// Core Modules
export * from './modules/pau';
export * from './modules/cap';
export * from './modules/abvet';
export * from './modules/autodonate';
export * from './modules/dashboard';

// AI Integration
export * from './modules/ai/syncFTT_CAP.js';

// Main App Components
export { default as App } from './App.jsx';
export { default as DashboardApp } from './DashboardApp.jsx';
