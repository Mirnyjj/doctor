export default function AdminPage() {
  return (
    <main className="admin container">
      <h1>Админ-панель</h1>
      <section className="dashboard-grid">
        <article className="panel">
          <h2>Посты</h2>
          <ul>
            <li>Название</li><li>Теги</li><li>Секции: Заголовок / Фото / Текст</li>
          </ul>
        </article>
        <article className="panel">
          <h2>Баннер главной</h2>
          <ul>
            <li>Фото врача</li><li>Заголовок</li><li>Подзаголовок</li><li>Фон</li>
          </ul>
        </article>
        <article className="panel">
          <h2>Контакты и соцсети</h2>
          <ul>
            <li>Телефон</li><li>Email</li><li>Ссылки на соцсети + иконки</li>
          </ul>
        </article>
        <article className="panel">
          <h2>Сертификаты и отзывы</h2>
          <ul>
            <li>Загрузка изображений сертификатов</li><li>CRUD отзывов</li><li>Skeleton loading</li>
          </ul>
        </article>
      </section>
      <section className="panel">
        <h2>Supabase schema (визуально)</h2>
        <pre>{`tables:
- hero(id, title, subtitle, doctor_image, bg_image)
- posts(id, slug, title, excerpt, cover, tags[])
- post_sections(id, post_id, heading, image, body, sort)
- reviews(id, patient_name, text, rating)
- contacts(id, phone, email)
- socials(id, name, icon, url)
- certificates(id, image_url, title)`}</pre>
      </section>
    </main>
  );
}
