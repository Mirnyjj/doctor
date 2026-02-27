import Link from 'next/link';
import { FaBrain, FaHeartbeat, FaStar, FaStethoscope } from 'react-icons/fa';
import { doctor, posts, reviews } from '@/lib/data';
import { ThreeScrollPreview } from '@/components/ThreeScrollPreview';
import { ContactForm } from '@/components/ContactForm';

export default function HomePage() {
  return (
    <main>
      <section className="hero container glass">
        <div>
          <p className="eyebrow">Премиальная неврология</p>
          <h1>{doctor.name}</h1>
          <p className="muted">{doctor.subtitle}</p>
          <div className="actions">
            <button className="btn-primary">Записаться</button>
            <button className="btn-secondary">Обо мне</button>
          </div>
        </div>
        <div className="doctor-photo" />
      </section>

      <section className="container about">
        <h2>Обо мне</h2>
        <p>{doctor.bio}</p>
        <div className="specialties">
          {[FaBrain, FaStethoscope, FaHeartbeat, FaBrain].map((Icon, i) => (
            <article key={doctor.specialties[i]} className="card">
              <Icon />
              <p>{doctor.specialties[i]}</p>
            </article>
          ))}
        </div>
        <div className="cert-grid">
          {[1, 2, 3, 4].map((item) => <div key={item} className="cert-card">Сертификат {item}</div>)}
        </div>
      </section>

      <section className="sticky-3d">
        <div className="sticky-inner container">
          <h2>Карусель постов</h2>
          <ThreeScrollPreview posts={posts} />
        </div>
      </section>

      <section className="container posts-grid">
        <h2>Посты</h2>
        <div className="grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-card">
              <img src={post.cover} alt={post.title} />
              <div className="post-body">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link href={`/post/${post.slug}`}>Подробнее</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container reviews">
        <h2>Отзывы</h2>
        <div className="scroll-row">
          {reviews.map((review) => (
            <article key={review.name} className="review-card">
              <h3>{review.name}</h3>
              <p>{review.text}</p>
              <div className="rating">{Array.from({ length: review.rating }).map((_, i) => <FaStar key={i} />)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="container contact glass">
        <h2>Обратная связь</h2>
        <ContactForm />
      </section>

      <footer className="container footer">
        <p>{doctor.contacts.phone} · {doctor.contacts.email}</p>
        <p>© 2026 НевроКлиника</p>
      </footer>
    </main>
  );
}
