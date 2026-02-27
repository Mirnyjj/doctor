import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Neuro Clinic',
  description: 'Современный медицинский лендинг врача-невролога'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
