"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { AppI18nText } from "@/lib/i18n";

const GiscusComment = ({ text }: { text: AppI18nText }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Giscus
      id="comments"
      repo="wangqiyangX/blog.qiyang.dev"
      repoId="R_kgDORiAlKw"
      category="Announcements"
      categoryId="DIC_kwDORiAlK84C3_qj"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang={text.giscusLang}
      loading="lazy"
    />
  );
};

export default GiscusComment;
