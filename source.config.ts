import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import { transformerTwoslash } from "fumadocs-twoslash";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { remarkMdxFiles } from 'fumadocs-core/mdx-plugins/remark-mdx-files';

const postSchema = pageSchema.extend({
  draft: z.boolean().optional(),
});

export const posts = defineDocs({
  dir: "content",
  docs: {
    schema: postSchema,
    postprocess: {
      includeProcessedMarkdown: true,
      extractLinkReferences: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [remarkMdxMermaid, remarkMath, remarkMdxFiles],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
      ],
      langs: ["js", "jsx", "ts", "tsx"],
    },
  },
});
