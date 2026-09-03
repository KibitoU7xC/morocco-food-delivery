'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Burger3DProps {
  onLoaded?: () => void;
}

export default function Burger3D({ onLoaded }: Burger3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 620;
    const height = container.clientHeight || 580;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup - Clean centered view
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.55);

    // 3. WebGL Renderer with Spline-like Studio Quality
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting System (Warm, Gourmet Appetizing)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 3.2);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const goldenRimLight = new THREE.DirectionalLight(0xf5b301, 2.2);
    goldenRimLight.position.set(-4, 3, -4);
    scene.add(goldenRimLight);

    const softFillLight = new THREE.DirectionalLight(0xffe4d6, 1.5);
    softFillLight.position.set(0, -3, 3);
    scene.add(softFillLight);

    // 5. 360-degree OrbitControls (smooth rotation around natural center)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false; // Keep scale consistent while allowing rotation
    controls.enablePan = false;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.minPolarAngle = Math.PI / 6;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;

    // 6. Load GLB Model from public folder
    let burgerModel: THREE.Group | null = null;
    let baseModelY = 0;
    const loader = new GLTFLoader();

    loader.load(
      '/burger_realistic_free.glb',
      (gltf) => {
        burgerModel = gltf.scene;

        // Auto-center and scale up prominently
        const box = new THREE.Box3().setFromObject(burgerModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 2.30 / maxDim;
        burgerModel.scale.setScalar(targetScale);

        // Center pivot perfectly at origin
        burgerModel.position.x = -center.x * targetScale;
        burgerModel.position.y = -center.y * targetScale;
        burgerModel.position.z = -center.z * targetScale;
        baseModelY = burgerModel.position.y;

        // Enhance material reflections
        burgerModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(mat.roughness, 0.35);
              mat.envMapIntensity = 1.2;
            }
          }
        });

        scene.add(burgerModel);
        setLoading(false);
        if (onLoaded) onLoaded();
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading 3D burger model:', error);
        setLoading(false);
      }
    );

    // 7. Mouse subtle parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.3;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };
    container.addEventListener('pointermove', handlePointerMove);

    // 8. Animation Loop (using standard performance.now to avoid THREE.Clock deprecation)
    const startTime = performance.now();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Subtle organic breathing float on model
      if (burgerModel) {
        burgerModel.position.y = baseModelY + Math.sin(elapsedTime * 1.6) * 0.02;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onLoaded]);

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing touch-none select-none z-20"
      />

      {/* Loading Progress */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-30">
          <div className="w-10 h-10 rounded-full border-4 border-[#5906e7]/20 border-t-[#5906e7] animate-spin mb-3" />
          <span className="text-xs font-bold text-[#19181f]">
            Loading 3D Burger... {loadingProgress}%
          </span>
        </div>
      )}
    </div>
  );
}
