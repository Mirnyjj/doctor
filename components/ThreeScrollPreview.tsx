'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Post } from '@/lib/data';

type Props = { posts: Post[] };

type ScenePlane = {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  spreadX: number;
  delay: number;
};

const createHand = (side: -1 | 1) => {
  const hand = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({
    color: '#9fc5d2',
    roughness: 0.34,
    metalness: 0.12
  });

  const palm = new THREE.Mesh(new THREE.SphereGeometry(0.74, 38, 30), skin);
  palm.scale.set(1.12, 0.64, 0.87);
  palm.rotation.z = side * 0.12;
  hand.add(palm);

  const thumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.64, 6, 14), skin);
  thumb.rotation.set(0.72, side * 0.48, side * 0.4);
  thumb.position.set(side * 0.63, -0.06, 0.22);
  hand.add(thumb);

  const fingerOffsets = [-0.36, -0.14, 0.09, 0.3];
  fingerOffsets.forEach((offset, index) => {
    const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.76 - index * 0.08, 6, 12), skin);
    finger.position.set(offset * side, 0.56 - index * 0.03, 0.2 - index * 0.04);
    finger.rotation.set(0.12 + index * 0.04, 0, side * (0.1 + index * 0.03));
    hand.add(finger);
  });

  const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.42, 0.64, 28), skin);
  wrist.position.set(0, -0.67, -0.12);
  wrist.rotation.z = side * 0.05;
  hand.add(wrist);

  hand.position.set(side * 1.5, -0.1, 0.26);
  hand.rotation.z = -side * 0.27;

  return hand;
};

const smoothStep = (edge0: number, edge1: number, value: number) => {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const getRenderHeight = (width: number) => {
  if (width < 420) return 310;
  if (width < 640) return 350;
  if (width < 860) return 410;
  return 470;
};

const getHandSpread = (width: number) => {
  if (width < 420) return 1.04;
  if (width < 640) return 1.14;
  if (width < 860) return 1.28;
  return 1.5;
};

const getPlaneScaleFactor = (width: number) => {
  if (width < 420) return 0.72;
  if (width < 640) return 0.82;
  if (width < 860) return 0.92;
  return 1;
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
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / getRenderHeight(mount.clientWidth), 0.1, 100);
    camera.position.set(0, 0.2, 6.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, getRenderHeight(mount.clientWidth));
    mount.appendChild(renderer.domElement);

    const handGroup = new THREE.Group();
    const leftHand = createHand(-1);
    const rightHand = createHand(1);
    handGroup.add(leftHand, rightHand);
    scene.add(handGroup);

    scene.add(new THREE.AmbientLight('#ffffff', 0.9));

    const keyLight = new THREE.DirectionalLight('#7dd3fc', 1.15);
    keyLight.position.set(2.5, 3, 3);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight('#c084fc', 0.75, 14);
    rimLight.position.set(0, 1.4, -2.5);
    scene.add(rimLight);

    const loader = new THREE.TextureLoader();
    const planes: ScenePlane[] = posts.map((post, index) => {
      const texture = loader.load(post.cover);
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 1.44), material);
      const spreadX = (index % 2 === 0 ? -1 : 1) * (0.62 + (index % 3) * 0.18);
      mesh.position.set(spreadX, -2.2, -1.5);
      scene.add(mesh);

      return {
        mesh,
        spreadX,
        delay: index / Math.max(posts.length, 1)
      };
    });

    const section = mount.closest('.sticky-3d');
    const start = performance.now();
    let progress = 0;

    const updateCardContent = () => {
      const index = Math.min(posts.length - 1, Math.floor(progress * posts.length));
      const post = posts[index];

      const cardOpacity = 0.34 + progress * 0.66;
      const cardScale = 1.24 - progress * 0.26;
      card.style.transform = `translateY(${(1 - progress) * 16}px) rotateY(${progress * 13}deg) scale(${cardScale})`;
      card.style.opacity = `${cardOpacity}`;
      title.textContent = post.title;
      desc.textContent = post.description;
      card.style.backgroundImage = `url(${post.cover})`;
    };

    const onScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const max = section.clientHeight - window.innerHeight;
      progress = Math.min(1, Math.max(0, -rect.top / Math.max(max, 1)));
      updateCardContent();
    };

    const applyResponsiveScene = () => {
      const width = mount.clientWidth;
      const renderHeight = getRenderHeight(width);
      const handSpread = getHandSpread(width);
      const planeFactor = getPlaneScaleFactor(width);

      leftHand.position.x = -handSpread;
      rightHand.position.x = handSpread;

      camera.aspect = width / renderHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, renderHeight);

      planes.forEach(({ mesh }) => {
        mesh.scale.setScalar(planeFactor);
      });
    };

    let frameId = 0;
    const renderLoop = () => {
      const elapsed = (performance.now() - start) / 1000;

      handGroup.rotation.y = Math.sin(elapsed * 0.75) * 0.08;
      leftHand.rotation.y = progress * 0.42 + Math.sin(elapsed * 1.2) * 0.07;
      rightHand.rotation.y = -progress * 0.42 - Math.sin(elapsed * 1.2) * 0.07;
      leftHand.position.y = -0.1 + Math.sin(elapsed * 1.4) * 0.03;
      rightHand.position.y = -0.1 + Math.cos(elapsed * 1.4) * 0.03;

      planes.forEach(({ mesh, delay, spreadX }) => {
        const t = (elapsed * 0.32 + progress * 0.72 + delay) % 1;
        const rise = smoothStep(0, 1, t);
        const fadeIn = smoothStep(0.06, 0.32, t);
        const fadeOut = 1 - smoothStep(0.72, 0.96, t);
        const visibility = Math.max(0, Math.min(1, fadeIn * fadeOut));

        const material = mesh.material;
        material.opacity = visibility * (0.72 + progress * 0.26);

        mesh.position.x = spreadX * (1 - rise) * 0.45;
        mesh.position.y = -2.15 + rise * 2.35;
        mesh.position.z = -1.35 + rise * 1.95;

        const scale = 0.48 + rise * 0.74 + visibility * 0.14;
        mesh.scale.set(scale, scale, 1);
        mesh.lookAt(0, 0.18, 5.2);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };

    onScroll();
    applyResponsiveScene();
    renderLoop();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', applyResponsiveScene);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', applyResponsiveScene);
      cancelAnimationFrame(frameId);

      planes.forEach(({ mesh }) => {
        mesh.material.map?.dispose();
        mesh.material.dispose();
        mesh.geometry.dispose();
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
