"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

const GiscusComment = () => {
  const { theme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo="wangqiyangX/blog.qiyang.dev"
      repoId="R_kgDORiAlKw"
      category="Announcements"
      categoryId="DIC_kwDORiAlK84C3_qj"
      mapping="pathname"
      strict="0"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === "light" ? "light" : "dark"}
      lang="en"
      loading="lazy"
    />
  );
};

export default GiscusComment;
