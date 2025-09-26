/**
 * Avatar3D Module - 3D Avatar Generation System
 * Part of TRYONYOU - ABVETOS - ULTRA-PLUS-ULTIMATUM
 * 
 * This module handles the creation and management of photorealistic 3D avatars
 * based on user measurements and photos, serving as the foundation for virtual try-on experiences.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Avatar3D {
    constructor(containerElement, options = {}) {
        this.container = containerElement;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.controls = null;
        this.avatarModel = null;
        this.measurements = {};
        this.customizations = {};
        
        // Configuration options
        this.options = {
            enableControls: true,
            autoRotate: false,
            lighting: 'studio',
            quality: 'high',
            ...options
        };
        
        this.init();
    }
    
    /**
     * Initialize the 3D environment and basic setup
     */
    init() {
        // Setup renderer
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // Setup camera
        this.camera.position.set(0, 1.6, 3);
        this.camera.lookAt(0, 1, 0);
        
        // Setup controls
        if (this.options.enableControls) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.autoRotate = this.options.autoRotate;
            this.controls.target.set(0, 1, 0);
        }
        
        // Setup lighting
        this.setupLighting();
        
        // Start render loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    /**
     * Setup lighting based on configuration
     */
    setupLighting() {
        // Clear existing lights
        const lights = this.scene.children.filter(child => child.isLight);
        lights.forEach(light => this.scene.remove(light));
        
        switch (this.options.lighting) {
            case 'studio':
                this.setupStudioLighting();
                break;
            case 'natural':
                this.setupNaturalLighting();
                break;
            case 'dramatic':
                this.setupDramaticLighting();
                break;
            default:
                this.setupStudioLighting();
        }
    }
    
    /**
     * Setup professional studio lighting
     */
    setupStudioLighting() {
        // Key light
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
        keyLight.position.set(2, 3, 2);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        this.scene.add(keyLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
        fillLight.position.set(-2, 2, 1);
        this.scene.add(fillLight);
        
        // Rim light
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
        rimLight.position.set(0, 2, -3);
        this.scene.add(rimLight);
        
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
    }
    
    /**
     * Setup natural outdoor lighting
     */
    setupNaturalLighting() {
        // Sun light
        const sunLight = new THREE.DirectionalLight(0xfff8dc, 1.0);
        sunLight.position.set(3, 5, 2);
        sunLight.castShadow = true;
        this.scene.add(sunLight);
        
        // Sky light
        const skyLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.6);
        this.scene.add(skyLight);
        
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);
    }
    
    /**
     * Setup dramatic lighting for fashion photography
     */
    setupDramaticLighting() {
        // Main dramatic light
        const mainLight = new THREE.SpotLight(0xffffff, 2.0);
        mainLight.position.set(1, 4, 2);
        mainLight.angle = Math.PI / 6;
        mainLight.penumbra = 0.3;
        mainLight.castShadow = true;
        this.scene.add(mainLight);
        
        // Accent light
        const accentLight = new THREE.DirectionalLight(0x6666ff, 0.4);
        accentLight.position.set(-2, 1, -1);
        this.scene.add(accentLight);
        
        // Low ambient
        const ambientLight = new THREE.AmbientLight(0x202020, 0.1);
        this.scene.add(ambientLight);
    }
    
    /**
     * Generate avatar from user measurements
     * @param {Object} measurements - User body measurements
     * @param {Object} customizations - Avatar customization options
     */
    async generateAvatar(measurements, customizations = {}) {
        this.measurements = measurements;
        this.customizations = customizations;
        
        try {
            // Load base avatar model
            const baseModel = await this.loadBaseModel();
            
            // Apply measurements to model
            this.applyMeasurements(baseModel, measurements);
            
            // Apply customizations
            this.applyCustomizations(baseModel, customizations);
            
            // Add to scene
            if (this.avatarModel) {
                this.scene.remove(this.avatarModel);
            }
            
            this.avatarModel = baseModel;
            this.scene.add(this.avatarModel);
            
            // Position avatar
            this.avatarModel.position.set(0, 0, 0);
            
            return this.avatarModel;
            
        } catch (error) {
            console.error('Error generating avatar:', error);
            throw error;
        }
    }
    
    /**
     * Load base 3D model for avatar generation
     */
    async loadBaseModel() {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            
            // In a real implementation, this would load from a model library
            // For now, we'll create a basic humanoid model
            const geometry = new THREE.CapsuleGeometry(0.3, 1.6, 4, 8);
            const material = new THREE.MeshLambertMaterial({ color: 0xfdbcb4 });
            const model = new THREE.Mesh(geometry, material);
            
            // Add basic body parts
            this.addBodyParts(model);
            
            resolve(model);
        });
    }
    
    /**
     * Add basic body parts to the model
     */
    addBodyParts(model) {
        // Head
        const headGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xfdbcb4 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 0.9, 0);
        model.add(head);
        
        // Arms
        const armGeometry = new THREE.CapsuleGeometry(0.05, 0.6, 4, 8);
        const armMaterial = new THREE.MeshLambertMaterial({ color: 0xfdbcb4 });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.35, 0.3, 0);
        leftArm.rotation.z = Math.PI / 6;
        model.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.35, 0.3, 0);
        rightArm.rotation.z = -Math.PI / 6;
        model.add(rightArm);
        
        // Legs
        const legGeometry = new THREE.CapsuleGeometry(0.08, 0.8, 4, 8);
        const legMaterial = new THREE.MeshLambertMaterial({ color: 0xfdbcb4 });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.15, -0.6, 0);
        model.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.15, -0.6, 0);
        model.add(rightLeg);
    }
    
    /**
     * Apply user measurements to the avatar model
     */
    applyMeasurements(model, measurements) {
        if (!measurements) return;
        
        // Scale model based on height
        if (measurements.height) {
            const heightScale = measurements.height / 170; // Normalize to 170cm
            model.scale.y = heightScale;
        }
        
        // Adjust proportions based on measurements
        if (measurements.chest || measurements.bust) {
            const chestScale = (measurements.chest || measurements.bust) / 90; // Normalize to 90cm
            model.scale.x = Math.max(0.8, Math.min(1.3, chestScale));
        }
        
        if (measurements.waist) {
            const waistScale = measurements.waist / 75; // Normalize to 75cm
            // Apply waist scaling to torso area
            model.children.forEach(child => {
                if (child.position.y > -0.2 && child.position.y < 0.5) {
                    child.scale.x = Math.max(0.7, Math.min(1.4, waistScale));
                }
            });
        }
    }
    
    /**
     * Apply customizations to the avatar
     */
    applyCustomizations(model, customizations) {
        if (!customizations) return;
        
        // Skin tone
        if (customizations.skinTone) {
            const skinColor = this.getSkinToneColor(customizations.skinTone);
            model.traverse(child => {
                if (child.isMesh && child.material.color) {
                    child.material.color.setHex(skinColor);
                }
            });
        }
        
        // Hair (simplified implementation)
        if (customizations.hairStyle && customizations.hairColor) {
            this.addHair(model, customizations.hairStyle, customizations.hairColor);
        }
    }
    
    /**
     * Get skin tone color value
     */
    getSkinToneColor(skinTone) {
        const skinTones = {
            'light': 0xfdbcb4,
            'medium': 0xd08b5b,
            'tan': 0xae7242,
            'dark': 0x8d5524,
            'deep': 0x6b4226
        };
        
        return skinTones[skinTone] || skinTones['medium'];
    }
    
    /**
     * Add hair to the avatar
     */
    addHair(model, hairStyle, hairColor) {
        // Remove existing hair
        const existingHair = model.getObjectByName('hair');
        if (existingHair) {
            model.remove(existingHair);
        }
        
        // Create new hair
        const hairGeometry = new THREE.SphereGeometry(0.14, 16, 16);
        const hairMaterial = new THREE.MeshLambertMaterial({ color: hairColor });
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        hair.name = 'hair';
        hair.position.set(0, 0.95, 0);
        
        // Find head and add hair to it
        const head = model.children.find(child => child.position.y > 0.8);
        if (head) {
            head.add(hair);
        }
    }
    
    /**
     * Try on a virtual garment
     */
    async tryOnGarment(garmentData) {
        if (!this.avatarModel) {
            throw new Error('Avatar must be generated before trying on garments');
        }
        
        try {
            // Remove existing garments
            this.removeGarments();
            
            // Load and apply garment
            const garment = await this.loadGarment(garmentData);
            this.fitGarmentToAvatar(garment);
            
            return garment;
            
        } catch (error) {
            console.error('Error trying on garment:', error);
            throw error;
        }
    }
    
    /**
     * Remove existing garments from avatar
     */
    removeGarments() {
        const garments = this.avatarModel.children.filter(child => child.userData.isGarment);
        garments.forEach(garment => this.avatarModel.remove(garment));
    }
    
    /**
     * Load garment model
     */
    async loadGarment(garmentData) {
        // Simplified garment creation
        const garmentGeometry = new THREE.CylinderGeometry(0.35, 0.4, 0.8, 16);
        const garmentMaterial = new THREE.MeshLambertMaterial({ 
            color: garmentData.color || 0x4169e1,
            transparent: true,
            opacity: 0.9
        });
        
        const garment = new THREE.Mesh(garmentGeometry, garmentMaterial);
        garment.userData.isGarment = true;
        garment.userData.garmentType = garmentData.type;
        
        return garment;
    }
    
    /**
     * Fit garment to avatar proportions
     */
    fitGarmentToAvatar(garment) {
        // Position garment on avatar
        garment.position.set(0, 0.2, 0);
        
        // Scale garment based on avatar measurements
        const avatarScale = this.avatarModel.scale;
        garment.scale.copy(avatarScale);
        
        // Add garment to avatar
        this.avatarModel.add(garment);
    }
    
    /**
     * Animation loop
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * Handle window resize
     */
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    /**
     * Export avatar as image
     */
    exportImage(width = 512, height = 512) {
        const originalSize = this.renderer.getSize(new THREE.Vector2());
        
        // Temporarily resize for export
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        // Render frame
        this.renderer.render(this.scene, this.camera);
        
        // Get image data
        const imageData = this.renderer.domElement.toDataURL('image/png');
        
        // Restore original size
        this.renderer.setSize(originalSize.x, originalSize.y);
        this.camera.aspect = originalSize.x / originalSize.y;
        this.camera.updateProjectionMatrix();
        
        return imageData;
    }
    
    /**
     * Dispose of resources
     */
    dispose() {
        if (this.controls) {
            this.controls.dispose();
        }
        
        this.renderer.dispose();
        
        // Clean up geometries and materials
        this.scene.traverse(child => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    }
}

export default Avatar3D;
