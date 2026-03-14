"use client";

import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type CodePenProps = {
  html?: string;
  css?: string;
  js?: string;
  title?: string;
  height?: number;
  className?: string;
  previewClassName?: string;
  defaultTab?: "preview" | "html" | "css" | "js";
};

type TabKey = "preview" | "html" | "css" | "js";

const TAB_LABELS: Record<TabKey, string> = {
  preview: "Preview",
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
};

const IFRAME_SANDBOX = "allow-scripts";

function escapeScriptContent(code: string) {
  return code.replace(/<\/script>/gi, "<\\/script>");
}

function buildSrcDoc({
  html = "",
  css = "",
  js = "",
  title = "CodePen Preview",
}: Required<Pick<CodePenProps, "html" | "css" | "js" | "title">>) {
  const script = js.trim()
    ? `<script>${escapeScriptContent(js)}</script>`
    : "";
  const style = css.trim() ? `<style>${css}</style>` : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    ${style}
  </head>
  <body>
    ${html}
    ${script}
  </body>
</html>`;
}

export function CodePen({
  html = "",
  css = "",
  js = "",
  title = "CodePen Preview",
  height = 420,
  className,
  previewClassName,
  defaultTab = "preview",
}: CodePenProps) {
  const tabs = useMemo(() => {
    const nextTabs: TabKey[] = ["preview"];

    if (html.trim()) nextTabs.push("html");
    if (css.trim()) nextTabs.push("css");
    if (js.trim()) nextTabs.push("js");

    return nextTabs;
  }, [html, css, js]);
  const initialTab = tabs.includes(defaultTab) ? defaultTab : tabs[0];
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const instanceId = useId();

  const srcDoc = useMemo(
    () => buildSrcDoc({ html, css, js, title }),
    [html, css, js, title],
  );

  const codeByTab: Partial<Record<TabKey, string>> = {
    html,
    css,
    js,
  };

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border bg-fd-card text-fd-card-foreground",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2 border-b bg-fd-secondary/40 px-3 py-2">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${instanceId}-${tab}-panel`}
              id={`${instanceId}-${tab}-tab`}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                isActive
                  ? "bg-fd-background text-fd-foreground shadow-sm"
                  : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
              )}
            >
              {TAB_LABELS[tab]}
            </button>
          );
        })}
      </div>

      {activeTab === "preview" ? (
        <div
          role="tabpanel"
          id={`${instanceId}-preview-panel`}
          aria-labelledby={`${instanceId}-preview-tab`}
          className={cn("border-t-0 bg-white", previewClassName)}
        >
          <iframe
            title={title}
            srcDoc={srcDoc}
            sandbox={IFRAME_SANDBOX}
            loading="lazy"
            className="w-full border-0"
            style={{ height }}
          />
        </div>
      ) : (
        <div
          role="tabpanel"
          id={`${instanceId}-${activeTab}-panel`}
          aria-labelledby={`${instanceId}-${activeTab}-tab`}
          className="overflow-x-auto"
        >
          <pre className="m-0 max-h-[32rem] overflow-auto bg-fd-card px-4 py-4 text-sm leading-6">
            <code>{codeByTab[activeTab]}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
