import { getPageImage, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "@takumi-rs/image-response";
import { generate as DefaultImage } from "fumadocs-ui/og/takumi";
import { extractLocaleFromSlug } from "@/lib/i18n";

export const revalidate = false;

type OGRouteContext = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function GET(_req: Request, { params }: OGRouteContext) {
  const { slug } = await params;
  const imagePath = slug.slice(0, -1);
  const { locale, slugs } = extractLocaleFromSlug(imagePath);
  const page = source.getPage(slugs, locale);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage
      title={page.data.title}
      description={page.data.description}
      site="Qiyang's Blog"
    />,
    {
      width: 1200,
      height: 630,
      format: "webp",
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
