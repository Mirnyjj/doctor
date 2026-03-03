import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PostSection as PostSectionType } from "@/lib/types";

type PostSectionProps = {
  section: PostSectionType;
};

export function PostSection({ section }: PostSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[1.35rem]">{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="m-0 leading-7 text-slate-700">{section.text}</p>
        {section.image ? (
          <div className="overflow-hidden rounded-xl">
            <Image
              src={section.image}
              alt={section.title}
              width={1100}
              height={620}
              className="h-auto w-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
