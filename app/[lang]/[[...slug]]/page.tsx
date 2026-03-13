import { getPageImage, source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";
import { gitConfig } from "@/lib/layout.shared";
import GiscusComment from "@/components/giscus";
import {
  formatLocalizedDate,
  getAppI18nText,
  i18n,
  resolveLocale,
} from "@/lib/i18n";

type DocsPageProps = {
  params: Promise<{
    lang: string;
    slug?: string[];
  }>;
};

export default async function Page({ params }: DocsPageProps) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const page = source.getPage(slug, locale);
  if (!page) notFound();
  const text = getAppI18nText(locale);

  // const MDX = page.data.body;
  const { body: MDX, toc, full, lastModified } = page.data;

  return (
    <DocsPage toc={toc} full={full} tableOfContent={{ style: "clerk" }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} text={text} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/${page.path}`}
          text={text}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <div className="border-y py-3">
        <GiscusComment text={text} />
      </div>
      {lastModified && (
        <div className="text-sm text-fd-muted-foreground">
          {text.lastUpdatedOn} {formatLocalizedDate(lastModified, locale)}
        </div>
      )}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params: { lang: string; slug?: string[] }[] = [];

  for (const locale of i18n.languages) {
    for (const page of source.getPages(locale)) {
      if (page.slugs.length > 0) {
        params.push({ lang: locale, slug: page.slugs });
      } else {
        params.push({ lang: locale });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const page = source.getPage(slug, locale);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
