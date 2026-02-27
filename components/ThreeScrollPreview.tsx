'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Post } from '@/lib/data';

type Props = { posts: Post[] };

const createHand = (side: -1 | 1) => {
  const hand = new THREE.Group();

  const skin = new THREE.MeshStandardMaterial({
    color: '#9fc5d2',
    roughness: 0.35,
    metalness: 0.12
  });

  const palm = new THREE.Mesh(new THREE.SphereGeometry(0.72, 36, 28), skin);
  palm.scale.set(1.1, 0.62, 0.85);
  palm.rotation.z = side * 0.12;
  hand.add(palm);

  const thumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.64, 6, 14), skin);
  thumb.rotation.set(0.7, side * 0.45, side * 0.4);
  thumb.position.set(side * 0.62, -0.08, 0.2);
  hand.add(thumb);

  const fingerOffsets = [-0.36, -0.12, 0.08, 0.28];
  fingerOffsets.forEach((offset, index) => {
    const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.72 - index * 0.08, 6, 12), skin);
    finger.position.set(offset * side, 0.55 - index * 0.03, 0.18 - index * 0.05);
    finger.rotation.set(0.12 + index * 0.04, 0, side * (0.1 + index * 0.03));
    hand.add(finger);
  });

  const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.42, 0.62, 28), skin);
  wrist.position.set(0, -0.65, -0.1);
  wrist.rotation.z = side * 0.05;
  hand.add(wrist);

  hand.position.set(side * 1.55, -0.12, 0.25);
  hand.rotation.z = -side * 0.28;
  return hand;
};

export function ThreeScrollPreview({ posts }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!mountRef.current || !cardRef.current || !titleRef.current || !descRef.current || posts.length === 0) return;

    const mount = mountRef.current;
    const card = cardRef.current;
    const title = titleRef.current;
    const desc = descRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / 460, 0.1, 100);
    camera.position.set(0, 0.2, 6.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, 460);
    mount.appendChild(renderer.domElement);

    const handGroup = new THREE.Group();
    const leftHand = createHand(-1);
    const rightHand = createHand(1);
    handGroup.add(leftHand, rightHand);
    scene.add(handGroup);

    scene.add(new THREE.AmbientLight('#ffffff', 0.9));

    const keyLight = new THREE.DirectionalLight('#7dd3fc', 1.2);
    keyLight.position.set(2.6, 3, 3);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight('#c084fc', 0.7, 14);
    rimLight.position.set(0, 1.5, -2.5);
    scene.add(rimLight);

    const loader = new THREE.TextureLoader();
    const imagePlanes = posts.map((post, index) => {
      const texture = loader.load(post.cover);
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false
      });

      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.5), material);
      const angle = (index / posts.length) * Math.PI * 2;
      plane.position.set(Math.cos(angle) * 2, Math.sin(angle * 1.15) * 0.8, -0.6 + Math.sin(angle) * 0.5);
      plane.lookAt(0, 0.2, 5);
      scene.add(plane);
      return plane;
    });

    let progress = 0;
    const section = mount.closest('.sticky-3d');
    const start = performance.now();

    const onScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const max = section.clientHeight - window.innerHeight;
      progress = Math.min(1, Math.max(0, -rect.top / Math.max(max, 1)));

      const index = Math.min(posts.length - 1, Math.floor(progress * posts.length));
      const post = posts[index];

      const cardOpacity = 0.38 + progress * 0.62;
      const cardScale = 1.22 - progress * 0.24;
      card.style.transform = `translateY(${(1 - progress) * 16}px) rotateY(${progress * 14}deg) scale(${cardScale})`;
      card.style.opacity = `${cardOpacity}`;
      title.textContent = post.title;
      desc.textContent = post.description;
      card.style.backgroundImage = `url(${post.cover})`;
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / 460;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, 460);
    };

    let frameId = 0;
    const renderLoop = () => {
      const elapsed = (performance.now() - start) / 1000;

      handGroup.rotation.y = Math.sin(elapsed * 0.75) * 0.08;
      leftHand.rotation.y = progress * 0.45 + Math.sin(elapsed * 1.2) * 0.06;
      rightHand.rotation.y = -progress * 0.45 - Math.sin(elapsed * 1.2) * 0.06;
      leftHand.position.y = -0.12 + Math.sin(elapsed * 1.4) * 0.03;
      rightHand.position.y = -0.12 + Math.cos(elapsed * 1.4) * 0.03;

      imagePlanes.forEach((plane, index) => {
        const material = plane.material as THREE.MeshBasicMaterial;
        const phase = (progress * 2.4 + elapsed * 0.25 + index / posts.length) % 1;
        const visibleWindow = phase < 0.5 ? phase / 0.5 : (1 - phase) / 0.5;
        const visibility = Math.max(0, visibleWindow);

        const zoom = 0.76 + visibility * 0.95 + (1 - progress) * 0.35;
        plane.scale.setScalar(zoom);
        material.opacity = Math.min(0.95, visibility * (0.7 + progress * 0.3));
        plane.position.z = -0.4 + Math.sin(elapsed + index) * 0.45;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };

    onScroll();
    renderLoop();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      imagePlanes.forEach((plane) => {
        (plane.material as THREE.MeshBasicMaterial).map?.dispose();
        (plane.material as THREE.MeshBasicMaterial).dispose();
        plane.geometry.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [posts]);

  return (
    <div className="three-shell">
      <div ref={mountRef} className="three-canvas" />
      <div ref={cardRef} className="floating-card" />
      <h3 ref={titleRef}>{posts[0]?.title}</h3>
      <p ref={descRef}>{posts[0]?.description}</p>
    </div>
  );
}
