import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { getSiteTitle, i18n, type Locale } from "@/lib/i18n";
import {
  LocalizedLargeSearchToggle,
  LocalizedSearchToggle,
} from "@/components/search-ui";

export const gitConfig = {
  user: "wangqiyangX",
  repo: "blog.qiyang.dev",
  branch: "main",
};

export function baseOptions(locale: Locale): BaseLayoutProps {
  return {
    nav: {
      title: getSiteTitle(locale),
    },
    i18n,
    searchToggle: {
      components: {
        sm: <LocalizedSearchToggle hideIfDisabled className="p-2" />,
        lg: <LocalizedLargeSearchToggle hideIfDisabled />,
      },
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
