export type PostSection = { heading: string; image: string; text: string };

export type Post = {
  slug: string;
  title: string;
  tags: string[];
  excerpt: string;
  cover: string;
  description: string;
  sections: PostSection[];
};

export const doctor = {
  name: 'Др. Анастасия Воронова',
  subtitle: 'Невролог · 14 лет практики · нейрореабилитация, мигрень, когнитивное здоровье',
  bio: 'Сочетаю доказательную неврологию, точную диагностику и персональный подход. Работаю с пациентами, которым важен комфорт, прозрачность плана лечения и устойчивый результат.',
  specialties: ['Лечение мигрени', 'Головокружения', 'Боль в спине', 'Когнитивные расстройства'],
  contacts: {
    phone: '+7 (900) 123-45-67',
    email: 'doctor@neuroclinic.ru'
  }
};

export const posts: Post[] = [
  {
    slug: 'migraine-red-flags',
    title: 'Мигрень: когда нужно срочно к неврологу',
    tags: ['Мигрень', 'Диагностика'],
    excerpt: '5 признаков, при которых головная боль требует углублённого обследования.',
    cover: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80',
    description: 'Разбираем тревожные симптомы и алгоритм безопасной диагностики.',
    sections: [
      {
        heading: 'Опасные сигналы',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
        text: 'Резкая новая боль, неврологический дефицит, температура и ригидность мышц шеи — повод немедленно обратиться за помощью.'
      },
      {
        heading: 'Какие обследования действительно нужны',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
        text: 'Мы назначаем исследования по показаниям: МРТ, УЗДГ сосудов, лабораторные маркеры — без лишних процедур.'
      }
    ]
  },
  {
    slug: 'chronic-fatigue-neuro',
    title: 'Хроническая усталость: нейроподход к восстановлению',
    tags: ['Усталость', 'Сон', 'Нейрометаболизм'],
    excerpt: 'Почему усталость может быть неврологическим симптомом и что с этим делать.',
    cover: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1600&q=80',
    description: 'Комплексная стратегия: сон, стресс-менеджмент и нейрометаболическая поддержка.',
    sections: [
      {
        heading: 'С чего начинается диагностика',
        image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896e1?auto=format&fit=crop&w=1400&q=80',
        text: 'Первичная консультация включает шкалы усталости, анализ сна и исключение неврологической патологии.'
      }
    ]
  }
];

export const reviews = [
  { name: 'Елена, 38 лет', text: 'После 2 месяцев терапии частота мигрени снизилась в три раза.', rating: 5 },
  { name: 'Андрей, 45 лет', text: 'Очень системный и спокойный подход, всё поэтапно и понятно.', rating: 5 },
  { name: 'Марина, 29 лет', text: 'Впервые получила чёткий план по головокружениям и реабилитации.', rating: 4 }
];

export const adminMock = {
  postsFields: ['Название', 'Теги', 'Секции: Заголовок / Фото / Текст'],
  heroFields: ['Фото врача', 'Заголовок', 'Подзаголовок', 'Фоновое изображение'],
  contactFields: ['Телефон', 'Email', 'Соцсети (название + иконка + ссылка)'],
  feedbackFields: ['Сертификаты (изображения)', 'CRUD отзывов', 'Skeleton loading'],
};
