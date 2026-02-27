import { notFound } from 'next/navigation';
import { posts } from '@/lib/data';
import { RevealSection } from '@/components/RevealSection';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="post-page">
      <header className="post-hero" style={{ backgroundImage: `url(${post.cover})` }}>
        <div className="overlay" />
        <div className="container content">
          <h1>{post.title}</h1>
          <div className="tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </header>
      <article className="post-content container">
        {post.sections.map((section) => (
          <RevealSection key={section.heading}>
            <section>
              <h2>{section.heading}</h2>
              <img src={section.image} alt={section.heading} />
              <p>{section.text}</p>
            </section>
          </RevealSection>
        ))}
      </article>
    </main>
  );
}
