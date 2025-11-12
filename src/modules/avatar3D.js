/**
 * TRYONYOU - Avatar3D Module
 * 3D Avatar rendering and interaction system
 * Integrates with PAU (Personal Avatar Unit) for emotional expression
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Avatar3D {
  constructor(config = {}) {
    this.containerId = config.containerId || 'avatar-container';
    this.modelPath = config.modelPath || '/assets/pau/models/default.glb';
    this.emotionState = config.initialEmotion || 'neutral';
    // Initialize renderer, scene, and camera
    const container = document.getElementById(this.containerId);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    this.camera.position.z = 5;

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.scene.add(light);
  }

  /**
   * Initialize 3D avatar renderer
   */
  async init() {
    console.log('🎭 Initializing Avatar3D...');
    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error(`Container ${this.containerId} not found`);
    }

    // Initialize renderer
    this.renderer = {
      width: container.offsetWidth,
      height: container.offsetHeight,
      domElement: container
    };

    // Load 3D model
    await this.loadModel();
    
    console.log('✅ Avatar3D initialized');
    return this;
  }

  /**
   * Load 3D model from path
   */
  async loadModel() {
    console.log(`📦 Loading 3D model from ${this.modelPath}...`);
    return new Promise((resolve, reject) => {
      const loader = new THREE.GLTFLoader();
      loader.load(this.modelPath, (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
        console.log("📦 3D model loaded successfully.");
        resolve(this.model);
      }, undefined, (error) => {
        console.error("An error happened during model loading:", error);
        reject(error);
      });
    });
  }

  /**
   * Update avatar emotion state
   * @param {string} emotion - Emotion state (idle, hover, confesion, celebration)
   */
  setEmotion(emotion) {
    const validEmotions = ['idle', 'hover', 'confesion', 'celebration', 'neutral'];
    if (!validEmotions.includes(emotion)) {
      console.warn(`Invalid emotion: ${emotion}. Using 'neutral'`);
      emotion = 'neutral';
    }

    console.log(`😊 Setting avatar emotion to: ${emotion}`);
    this.emotionState = emotion;
    this.updateAnimation();
  }

  /**
   * Update animation based on emotion state
   */
  updateAnimation() {
    if (!this.model) return;
    
    console.log(`🎬 Updating animation for emotion: ${this.emotionState}`);
    // This is a simplified animation update. A real implementation would involve
    // a more sophisticated animation mixing system.
    if (this.model && this.model.animations) {
      const animation = this.model.animations.find(anim => anim.name === this.emotionState);
      if (animation) {
        // In a real app, you would use an AnimationMixer here
        console.log(`Playing animation: ${this.emotionState}`);
      } else {
        console.warn(`Animation for emotion '${this.emotionState}' not found.`);
      }
    }
  }

  /**
   * Render avatar frame
   */
  render() {
    if (!this.renderer || !this.model) return;
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Cleanup resources
   */
  dispose() {
    console.log('🧹 Disposing Avatar3D resources...');
    this.renderer = null;
    this.model = null;
  }
}

export default Avatar3D;
