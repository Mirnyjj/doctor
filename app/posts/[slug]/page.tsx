import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/db";
import { mapMetaToMetadata } from "@/lib/metadata";

const Reveal = dynamic(
  () => import("@/components/animation/Reveal").then((mod) => mod.Reveal),
  { ssr: false },
);
const PostSection = dynamic(
  () => import("@/components/posts/PostSection").then((mod) => mod.PostSection),
  { ssr: true },
);

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  if (!data) {
    return {
      title: "Статья не найдена",
      robots: { index: false, follow: false },
    };
  }

  const mapped = mapMetaToMetadata(data.meta, data.post.title);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const canonicalPath = `/posts/${data.post.slug}`;

  return {
    ...mapped,
    title: data.post.title,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      ...mapped.openGraph,
      type: "article",
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: data.post.banner_image,
          width: 1200,
          height: 630,
          alt: data.post.title,
        },
      ],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  if (!data) notFound();

  return (
    <main className="mx-auto max-w-5xl px-5 pb-16 pt-10">
      {data.meta?.json_ld ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.meta.json_ld) }}
        />
      ) : null}

      <header className="mb-6">
        <h1 className="mb-4 text-[clamp(2rem,4vw,2.8rem)] text-sky-950">
          {data.post.title}
        </h1>
        <div className="overflow-hidden rounded-2xl shadow-[0_14px_36px_rgba(12,61,88,0.13)]">
          <Image
            src={data.post.banner_image}
            alt={data.post.title}
            width={1400}
            height={760}
            priority
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
        </div>
      </header>

      <section className="flex flex-col gap-5">
        {data.sections.map((section) => (
          <Reveal key={section.id}>
            <PostSection section={section} />
          </Reveal>
        ))}
      </section>
    </main>
  );
}
