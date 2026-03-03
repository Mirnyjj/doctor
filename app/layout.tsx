import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { getGlobalMeta, getSiteSettings } from "@/lib/db";
import { CookieConsent } from "@/components/CookieConsent";
import { mapMetaToMetadata } from "@/lib/metadata";
import type { Json } from "@/lib/supabase/database.types";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const defaultJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Неврологическая клиника Доктора Авдеевой",
  description:
    "Диагностика и лечение неврологических заболеваний: мигрени, боли в спине, нарушения сна и реабилитация.",
  url: process.env.NEXT_PUBLIC_APP_URL,
  telephone: "+79276136513",
  medicalSpecialty: "Neurologic",
};

const asJsonLd = (value: Json | null) => {
  if (!value || typeof value !== "object") {
    return defaultJsonLd;
  }

  return value;
};

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobalMeta();

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ),
    ...mapMetaToMetadata(meta, "Неврологическая клиника Доктора Авдеевой"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, globalMeta] = await Promise.all([
    getSiteSettings().catch((error) => {
      console.error("Error loading site settings:", error);
      return null;
    }),
    getGlobalMeta().catch((error) => {
      console.error("Error loading global meta:", error);
      return null;
    }),
  ]);

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(asJsonLd(globalMeta?.json_ld ?? null)),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106364517', 'ym');

      window.__METRIKA_CONSENT = localStorage.getItem('cookie-consent') === 'true';
      if (!window.__METRIKA_CONSENT) {
        window.ym = function(){};
      } else {
        ym(106364517, 'init', {
          ssr:true, webvisor:true, clickmap:true,
          ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true
        });
      }
    `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${inter.className} h-full antialiased font-sans`}
      >
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106364517"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <div
          className="fixed inset-0 z-[-2] bg-no-repeat"
          style={{
            backgroundImage: settings?.background_gif_url
              ? `url(${settings.background_gif_url})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundColor: "#f4fbff",
          }}
        />

        <div className="fixed inset-0 z-[-1] bg-white/85" />

        <div className="relative z-0 min-h-screen">
          <ErrorBoundary>{children}</ErrorBoundary>
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
