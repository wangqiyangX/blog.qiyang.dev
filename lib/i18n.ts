import { defineI18n } from "fumadocs-core/i18n";
import { defineI18nUI } from "fumadocs-ui/i18n";

export const i18n = defineI18n({
  defaultLanguage: "en",
  languages: ["en", "zh"],
  hideLocale: "default-locale",
});

export const i18nUI = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
    },
    zh: {
      displayName: "简体中文",
      search: "搜索",
      searchNoResult: "未找到结果",
      toc: "目录",
      tocNoHeadings: "暂无标题",
      lastUpdate: "最后更新于",
      chooseLanguage: "选择语言",
      nextPage: "下一页",
      previousPage: "上一页",
      chooseTheme: "主题",
      editOnGithub: "在 GitHub 上编辑",
    },
  },
});

export type Locale = (typeof i18n.languages)[number];

const localeSet = new Set(i18n.languages);

export function isLocale(value: string | undefined): value is Locale {
  if (!value) return false;
  return localeSet.has(value as Locale);
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : i18n.defaultLanguage;
}

export function extractLocaleFromSlug(slug?: string[]): {
  locale: Locale;
  slugs: string[];
} {
  if (!slug || slug.length === 0) {
    return { locale: i18n.defaultLanguage, slugs: [] };
  }

  const [head, ...rest] = slug;
  if (isLocale(head)) {
    return { locale: head, slugs: rest };
  }

  return { locale: i18n.defaultLanguage, slugs: slug };
}

export type AppI18nText = {
  siteTitle: string;
  copyMarkdown: string;
  open: string;
  openInGithub: string;
  viewAsMarkdown: string;
  openInScira: string;
  openInChatGPT: string;
  openInClaude: string;
  openInCursor: string;
  noDescription: string;
  lastUpdatedOn: string;
  giscusLang: "en" | "zh-CN";
};

const appText: Record<Locale, AppI18nText> = {
  en: {
    siteTitle: "Qiyang's Blog",
    copyMarkdown: "Copy Markdown",
    open: "Open",
    openInGithub: "Open in GitHub",
    viewAsMarkdown: "View as Markdown",
    openInScira: "Open in Scira AI",
    openInChatGPT: "Open in ChatGPT",
    openInClaude: "Open in Claude",
    openInCursor: "Open in Cursor",
    noDescription: "No description",
    lastUpdatedOn: "Last updated on",
    giscusLang: "en",
  },
  zh: {
    siteTitle: "启阳的博客",
    copyMarkdown: "复制 Markdown",
    open: "打开",
    openInGithub: "在 GitHub 打开",
    viewAsMarkdown: "查看 Markdown",
    openInScira: "在 Scira AI 打开",
    openInChatGPT: "在 ChatGPT 打开",
    openInClaude: "在 Claude 打开",
    openInCursor: "在 Cursor 打开",
    noDescription: "暂无描述",
    lastUpdatedOn: "最后更新于",
    giscusLang: "zh-CN",
  },
};

export function getAppI18nText(locale: Locale): AppI18nText {
  return appText[locale];
}

export function getSiteTitle(locale: Locale): string {
  return appText[locale].siteTitle;
}

const dateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  zh: new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
};

export function formatLocalizedDate(
  date: Date | number,
  locale: Locale,
): string {
  return dateFormatters[locale].format(date);
}
