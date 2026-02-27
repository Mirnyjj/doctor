'use client';

import { FormEvent, useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <input required placeholder="Имя" name="name" />
      <input required placeholder="Телефон" name="phone" />
      <textarea required placeholder="Сообщение" rows={4} name="message" />
      <button className="btn-primary" type="submit">Отправить</button>
      {submitted ? <p className="success">✅ Сообщение успешно отправлено.</p> : null}
    </form>
  );
}
