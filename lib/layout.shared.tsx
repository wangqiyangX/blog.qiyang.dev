import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "@/lib/i18n";

export const gitConfig = {
  user: "wangqiyangX",
  repo: "blog.qiyang.dev",
  branch: "main",
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Qiyang's Blog",
    },
    i18n,
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
