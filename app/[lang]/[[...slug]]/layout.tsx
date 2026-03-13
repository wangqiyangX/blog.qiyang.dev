import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { i18nUI, resolveLocale } from "@/lib/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { LocalizedSearchDialog } from "@/components/search-ui";

type DocsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
    slug?: string[];
  }>;
};

export default async function Layout({ children, params }: DocsLayoutProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);

  return (
    <RootProvider
      i18n={i18nUI.provider(locale)}
      search={{
        SearchDialog: LocalizedSearchDialog,
      }}
    >
      <DocsLayout tree={source.getPageTree(locale)} {...baseOptions(locale)}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
