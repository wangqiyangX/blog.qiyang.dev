import { getLLMText, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { extractLocaleFromSlug } from "@/lib/i18n";

export const revalidate = false;

type LLMRouteContext = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function GET(_req: Request, { params }: LLMRouteContext) {
  const { slug } = await params;
  const { locale, slugs } = extractLocaleFromSlug(slug);
  const page = source.getPage(slugs, locale);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: page.url.split("/").filter((v) => v.length > 0),
  }));
}
