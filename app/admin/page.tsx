import { adminMock } from '@/lib/data';

export default function AdminPage() {
  return (
    <main className="admin container">
      <h1>Админ-панель (Mock Mode)</h1>
      <p className="muted">Данные загружаются из локальных моков, без Supabase.</p>

      <section className="dashboard-grid">
        <article className="panel">
          <h2>Посты</h2>
          <ul>
            {adminMock.postsFields.map((field) => <li key={field}>{field}</li>)}
          </ul>
        </article>

        <article className="panel">
          <h2>Баннер главной</h2>
          <ul>
            {adminMock.heroFields.map((field) => <li key={field}>{field}</li>)}
          </ul>
        </article>

        <article className="panel">
          <h2>Контакты и соцсети</h2>
          <ul>
            {adminMock.contactFields.map((field) => <li key={field}>{field}</li>)}
          </ul>
        </article>

        <article className="panel">
          <h2>Сертификаты и отзывы</h2>
          <ul>
            {adminMock.feedbackFields.map((field) => <li key={field}>{field}</li>)}
          </ul>
        </article>
      </section>

      <section className="panel">
        <h2>Mock storage structure</h2>
        <pre>{`mockData:
- hero: { title, subtitle, doctorImage, backgroundImage }
- posts: [{ slug, title, tags, excerpt, cover }]
- postSections: [{ postSlug, heading, image, text, sort }]
- reviews: [{ patientName, text, rating }]
- contacts: { phone, email }
- socials: [{ name, icon, url }]
- certificates: [{ title, imageUrl }]`}</pre>
      </section>
    </main>
  );
}
