import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Mermaid } from "@/components/mdx/mermaid";
import { CodeSandbox } from "@/components/mdx/codesandbox";
import { CodePen } from "@/components/mdx/codepen";
import * as Twoslash from "fumadocs-twoslash/ui";
import { File, Folder, Files } from 'fumadocs-ui/components/files';
import { GithubInfo } from 'fumadocs-ui/components/github-info';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    CodeSandbox,
    CodePen,
    GithubInfo,
    Mermaid,
    Files,
    File,
    Folder,
    ...Twoslash,
    ...components,
  };
}
