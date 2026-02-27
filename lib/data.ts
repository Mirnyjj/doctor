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
  name: "Др. Анастасия Воронова",
  subtitle:
    "Невролог · 14 лет практики · нейрореабилитация, мигрень, когнитивное здоровье",
  bio: "Сочетаю доказательную неврологию, точную диагностику и персональный подход. Работаю с пациентами, которым важен комфорт, прозрачность плана лечения и устойчивый результат.",
  specialties: [
    "Лечение мигрени",
    "Головокружения",
    "Боль в спине",
    "Когнитивные расстройства",
  ],
  contacts: {
    phone: "+7 (900) 123-45-67",
    email: "doctor@neuroclinic.ru",
  },
};

export const posts: Post[] = [
  {
    slug: "stroke-first-aid",
    title: "Инсульт: первые 4 часа решают всё",
    tags: ["Инсульт", "Первая помощь"],
    excerpt: "Как распознать и что делать до приезда скорой.",
    cover:
      "https://images.unsplash.com/photo-1602103852468-68d918485d59?auto=format&fit=crop&w=1600&q=80",
    description:
      "Алгоритм действий при остром нарушении мозгового кровообращения.",
    sections: [
      {
        heading: "FAST тест за 30 секунд",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1400&q=80",
        text: "Лицо (улыбка асимметрична?), руки (одна не поднимается?), речь (нечёткая?), время (вызвать скорую немедленно).",
      },
      {
        heading: "Позиция и мониторинг",
        image:
          "https://images.unsplash.com/photo-1516979187457-637a1ec31f73?auto=format&fit=crop&w=1400&q=80",
        text: "Положение на боку, не поить, не кормить, контролировать дыхание и пульс.",
      },
    ],
  },
  {
    slug: "vertigo-diagnosis",
    title: "Головокружение: не паникуйте, но и не игнорируйте",
    tags: ["Головокружение", "Вестибулярный аппарат"],
    excerpt:
      "Дифференциальная диагностика системного и несистемного головокружения.",
    cover:
      "https://images.unsplash.com/photo-1518509562904-e7dd73624ee0?auto=format&fit=crop&w=1600&q=80",
    description: "Тесты для точной локализации проблемы.",
    sections: [
      {
        heading: "Тест HINTS вместо МРТ",
        image:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80",
        text: "Head Impulse (nystagmus), Nystagmus (направление), Test of Skew — 99% точность для центрального/периферического.",
      },
    ],
  },
  {
    slug: "neuropathic-pain",
    title: "Невропатическая боль: когда таблетки не помогают",
    tags: ["Невралгия", "Хроническая боль"],
    excerpt: "Диагностика и современные подходы к терапии.",
    cover:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
    description: "От нейропатического скрининга до комбинированной терапии.",
    sections: [
      {
        heading: "DN4 опросник",
        image:
          "https://images.unsplash.com/photo-1576091160688-fd7b803e3f17?auto=format&fit=crop&w=1400&q=80",
        text: "Жжение, покалывание, онемение, боль от лёгкого касания — 4+ баллов = невропатическая природа.",
      },
      {
        heading: "Первая линия терапии",
        image:
          "https://images.unsplash.com/photo-1603796846086-b93263c1b94f?auto=format&fit=crop&w=1400&q=80",
        text: "Габапентиноиды > трициклические антидепрессанты > СИОЗСН + опиоидная ротация.",
      },
    ],
  },
  {
    slug: "tremor-diff",
    title: "Тремор: доброкачественный или болезнь Паркинсона?",
    tags: ["Тремор", "Паркинсон"],
    excerpt: "Ключевые отличия и когда начинать терапию.",
    cover:
      "https://images.unsplash.com/photo-1582213782174-e1c68a3b95f0?auto=format&fit=crop&w=1600&q=80",
    description: "Клиническая картина и дифференциальная диагностика.",
    sections: [
      {
        heading: "4 критерия отличия",
        image:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d83?auto=format&fit=crop&w=1400&q=80",
        text: "Покой (Паркинсон) vs действие (эссенциальный), асимметрия, брадикинезия, эффект DaTSCAN.",
      },
    ],
  },
  {
    slug: "memory-young",
    title: "Нарушение памяти до 50 лет — тревожный сигнал",
    tags: ["Память", "Когнитивные нарушения"],
    excerpt: "Когда забывчивость = ранняя деменция.",
    cover:
      "https://images.unsplash.com/photo-1616467717274-1e98e656b0c9?auto=format&fit=crop&w=1600&q=80",
    description: "Ранние маркеры и когнитивный скрининг.",
    sections: [
      {
        heading: "MoCA тест онлайн",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80",
        text: "Визуально-пространственное (часы), память (5 слов), внимание, абстракция, отложенное воспроизведение.",
      },
    ],
  },
  {
    slug: "radiculopathy-l5",
    title: "Ишиас L5-S1: МРТ или сразу блокада?",
    tags: ["Ишиас", "Грыжа"],
    excerpt: "Алгоритм выбора тактики при люмбальной радикулопатии.",
    cover:
      "https://images.unsplash.com/photo-1581578731548-81b82321c514?auto=format&fit=crop&w=1600&q=80",
    description: "От консервативных мер до хирургии.",
    sections: [
      {
        heading: "Красные флаги для МРТ",
        image:
          "https://images.unsplash.com/photo-1519885648155-26b3e4a029f8?auto=format&fit=crop&w=1400&q=80",
        text: "Седловидная анестезия, недержание, двусторонняя слабость, прогрессирующий парез <72ч.",
      },
    ],
  },
  {
    slug: "sleep-paralysis",
    title: "Сонный паралич: неврология или психиатрия?",
    tags: ["Сон", "Нарколепсия"],
    excerpt: "Диагностика и безопасные методы коррекции.",
    cover:
      "https://images.unsplash.com/photo-1576836219517-462f26f52de7?auto=format&fit=crop&w=1600&q=80",
    description: "Классификация и поведенческая терапия.",
    sections: [
      {
        heading: "Эпворт шкала + MSLT",
        image:
          "https://images.unsplash.com/photo-1550283491-1063e5c5a3f7?auto=format&fit=crop&w=1400&q=80",
        text: "Дневная сонливость >10 баллов + среднее время засыпания <8мин = патология.",
      },
    ],
  },
  {
    slug: "polyneuropathy",
    title: "Полиневропатия: от диабета до дефицита B12",
    tags: ["Полиневропатия", "Диабет"],
    excerpt: "Лабораторный скрининг для исключения обратимых причин.",
    cover:
      "https://images.unsplash.com/photo-1559757149-2eb7997ee551?auto=format&fit=crop&w=1600&q=80",
    description: "Пошаговая диагностика симметричной сенсорной невропатии.",
    sections: [
      {
        heading: "Минимальный набор анализов",
        image:
          "https://images.unsplash.com/photo-1559756088-03f6a85590b7?auto=format&fit=crop&w=1400&q=80",
        text: "HbA1c, B12, фолиевая, гомоцистеин, РФ, АЦЦП, СРБ, КФК, альбумин моча.",
      },
    ],
  },
  {
    slug: "essential-tremor",
    title: "Эссенциальный тремор: лекарства и инъекции",
    tags: ["Тремор", "Терапия"],
    excerpt: "Когда начинать лечение и что эффективно.",
    cover:
      "https://images.unsplash.com/photo-1600950009853-7dd62f969870?auto=format&fit=crop&w=1600&q=80",
    description: "Медикаментозная терапия и ботулотоксин.",
    sections: [
      {
        heading: "Прогрессия по Fahn-Tolosa-Marin",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80",
        text: "Амплитуда >1см, интерференция с письмом/питьём, инвалидизация = терапия 1 линии.",
      },
    ],
  },
  {
    slug: "cervical-dystonia",
    title: "Шейная дистония: ботокс работает не всегда",
    tags: ["Дистония", "Ботулинотерапия"],
    excerpt: "Диагностика и критерии неудачи терапии.",
    cover:
      "https://images.unsplash.com/photo-1587563871167-2e25c9e63ab9?auto=format&fit=crop&w=1600&q=80",
    description: "От подбора дозы до GPi DBS.",
    sections: [
      {
        heading: "Toronto Western Spasmodic Torticollis Rating Scale",
        image:
          "https://images.unsplash.com/photo-1535224206242-487f7090b5ed?auto=format&fit=crop&w=1400&q=80",
        text: "Угол поворота >30°, латеральный сдвиг >2см, боль VAS>5 — высокая доза + сенсорная триггерная терапия.",
      },
    ],
  },
];

export const reviews = [
  {
    name: "Елена, 38 лет",
    text: "После 2 месяцев терапии частота мигрени снизилась в три раза.",
    rating: 5,
  },
  {
    name: "Андрей, 45 лет",
    text: "Очень системный и спокойный подход, всё поэтапно и понятно.",
    rating: 5,
  },
  {
    name: "Марина, 29 лет",
    text: "Впервые получила чёткий план по головокружениям и реабилитации.",
    rating: 4,
  },
];

export const adminMock = {
  postsFields: ["Название", "Теги", "Секции: Заголовок / Фото / Текст"],
  heroFields: [
    "Фото врача",
    "Заголовок",
    "Подзаголовок",
    "Фоновое изображение",
  ],
  contactFields: ["Телефон", "Email", "Соцсети (название + иконка + ссылка)"],
  feedbackFields: [
    "Сертификаты (изображения)",
    "CRUD отзывов",
    "Skeleton loading",
  ],
};
