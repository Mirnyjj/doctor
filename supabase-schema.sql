create table hero (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null,
  doctor_image text,
  bg_image text,
  updated_at timestamptz default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover text,
  tags text[] default '{}',
  created_at timestamptz default now()
);

create table post_sections (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  heading text,
  image text,
  body text,
  sort int default 0
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  text text not null,
  rating int check (rating between 1 and 5),
  created_at timestamptz default now()
);

create table contacts (
  id uuid primary key default gen_random_uuid(),
  phone text,
  email text
);

create table socials (
  id uuid primary key default gen_random_uuid(),
  name text,
  icon text,
  url text
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  title text
);
