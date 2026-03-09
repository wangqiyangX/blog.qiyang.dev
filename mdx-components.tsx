import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Mermaid } from "@/components/mdx/mermaid";
import * as Twoslash from "fumadocs-twoslash/ui";
import { FeedbackBlock } from "@/components/feedback/client";
import { onBlockFeedbackAction } from "@/lib/github";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    ...Twoslash,
    FeedbackBlock: ({ children, ...rest }) => (
      <FeedbackBlock {...rest} onSendAction={onBlockFeedbackAction}>
        {children}
      </FeedbackBlock>
    ),
    ...components,
  };
}
