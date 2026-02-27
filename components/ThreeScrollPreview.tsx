'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Post } from '@/lib/data';

type Props = { posts: Post[] };

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
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / 420, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, 420);
    mount.appendChild(renderer.domElement);

    const leftHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 32, 32),
      new THREE.MeshStandardMaterial({ color: '#9fc5d2', roughness: 0.42, metalness: 0.08 })
    );
    leftHand.scale.set(1.05, 0.58, 0.65);
    leftHand.position.set(-1.45, -0.1, 0.3);

    const rightHand = leftHand.clone();
    rightHand.position.set(1.45, -0.1, 0.3);

    scene.add(leftHand, rightHand);
    scene.add(new THREE.AmbientLight('#ffffff', 0.95));
    const dir = new THREE.DirectionalLight('#7dd3fc', 1.3);
    dir.position.set(2, 3, 3);
    scene.add(dir);

    let frameId = 0;
    const renderLoop = () => {
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const section = mount.closest('.sticky-3d');
    const onScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const max = section.clientHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(max, 1)));
      const index = Math.min(posts.length - 1, Math.floor(progress * posts.length));
      const post = posts[index];

      leftHand.rotation.y = progress * 0.35;
      rightHand.rotation.y = -progress * 0.35;
      card.style.transform = `translateY(${(1 - progress) * 20}px) rotateY(${progress * 12}deg)`;
      card.style.opacity = `${0.65 + progress * 0.35}`;
      title.textContent = post.title;
      desc.textContent = post.description;
      card.style.backgroundImage = `url(${post.cover})`;
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / 420;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, 420);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
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
