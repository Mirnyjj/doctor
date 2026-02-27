'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Post } from '@/lib/data';

type Props = { posts: Post[] };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function ThreeScrollPreview({ posts }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const max = sectionRef.current.clientHeight - window.innerHeight;
      setScrollProgress(clamp(-rect.top / Math.max(max, 1), 0, 1));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const rotation = scrollProgress * 360;
  const activeIndex = Math.floor((rotation / 360) * posts.length) % posts.length;
  const activePost = posts[activeIndex] ?? posts[0];

  const orbitItems = useMemo(
    () =>
      posts.map((post, index) => {
        const base = (360 / posts.length) * index;
        const angle = base + rotation;
        return { post, angle };
      }),
    [posts, rotation]
  );

  return (
    <div ref={sectionRef} className="three-shell carousel-shell">
      <div className="carousel-bg" />
      <div className="carousel-overlay" />

      <div className="orbit">
        {orbitItems.map(({ post, angle }) => (
          <article
            key={post.slug}
            className="orbit-card"
            style={{
              transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit-radius))) rotate(${-angle}deg)`
            }}
          >
            <img src={post.cover} alt={post.title} />
            <p>{post.title}</p>
          </article>
        ))}
      </div>

      <div className="active-post glass">
        <h3>{activePost?.title}</h3>
        <p>{activePost?.description}</p>
      </div>
    </div>
  );
}
