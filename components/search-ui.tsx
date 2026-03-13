"use client";

import { useMemo, useState, type ComponentProps } from "react";
import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useDocsSearch } from "fumadocs-core/search/client";
import { useOnChange } from "fumadocs-core/utils/use-on-change";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import {
  useSearchContext,
  type SearchLink,
  type TagItem,
} from "fumadocs-ui/contexts/search";
import { buttonVariants } from "@/components/ui/button";

function getSearchUiText(locale?: string) {
  if (locale === "zh") {
    return {
      openSearch: "打开搜索",
      closeSearch: "关闭搜索",
      closeButton: "关闭",
      closeHint: "按 Esc 关闭",
    };
  }

  return {
    openSearch: "Open Search",
    closeSearch: "Close Search",
    closeButton: "Esc",
    closeHint: "Press Esc to close",
  };
}

function getHotKeyId(
  hotKey: NonNullable<ReturnType<typeof useSearchContext>["hotKey"]>[number],
) {
  if (typeof hotKey.key === "string") {
    return hotKey.key;
  }

  if (typeof hotKey.display === "string" || typeof hotKey.display === "number") {
    return String(hotKey.display);
  }

  return "hotkey";
}

export function LocalizedSearchToggle({
  hideIfDisabled,
  className,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean;
}) {
  const { setOpenSearch, enabled } = useSearchContext();
  const { locale } = useI18n();
  const text = getSearchUiText(locale);

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      data-search=""
      aria-label={text.openSearch}
      className={twMerge(
        buttonVariants({ color: "ghost", size: "icon-sm" }),
        className,
      )}
      onClick={() => setOpenSearch(true)}
      {...props}
    >
      <Search />
    </button>
  );
}

export function LocalizedLargeSearchToggle({
  hideIfDisabled,
  className,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text, locale } = useI18n();
  const ui = getSearchUiText(locale);

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      data-search-full=""
      aria-label={ui.openSearch}
      className={twMerge(
        "inline-flex items-center gap-2 rounded-lg border bg-fd-secondary/50 p-1.5 ps-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground",
        className,
      )}
      onClick={() => setOpenSearch(true)}
      {...props}
    >
      <Search className="size-4" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((key) => (
          <kbd key={getHotKeyId(key)} className="rounded-md border bg-fd-background px-1.5">
            {key.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}

type LocalizedSearchDialogProps = SharedProps & {
  links?: SearchLink[];
  type?: "fetch" | "static";
  defaultTag?: string;
  tags?: TagItem[];
  api?: string;
  delayMs?: number;
  allowClear?: boolean;
};

export function LocalizedSearchDialog({
  defaultTag,
  tags = [],
  api,
  delayMs,
  type = "fetch",
  allowClear = false,
  links = [],
  ...props
}: LocalizedSearchDialogProps) {
  const { locale } = useI18n();
  const ui = getSearchUiText(locale);
  const [tag, setTag] = useState(defaultTag);

  const { search, setSearch, query } = useDocsSearch(
    type === "fetch"
      ? {
          type: "fetch",
          api,
          locale,
          tag,
          delayMs,
        }
      : {
          type: "static",
          from: api,
          locale,
          tag,
          delayMs,
        },
  );

  const defaultItems = useMemo(() => {
    if (links.length === 0) return null;

    return links.map(([name, link]) => ({
      type: "page" as const,
      id: name,
      content: name,
      url: link,
    }));
  }, [links]);

  useOnChange(defaultTag, (value) => {
    setTag(value);
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose aria-label={ui.closeSearch}>
            {ui.closeButton}
          </SearchDialogClose>
        </SearchDialogHeader>
        <SearchDialogList
          items={query.data !== "empty" ? query.data : defaultItems}
        />
        <SearchDialogFooter>
          {tags.length > 0 && (
            <TagsList tag={tag} onTagChange={setTag} allowClear={allowClear}>
              {tags.map((item) => (
                <TagsListItem key={item.value} value={item.value}>
                  {item.name}
                </TagsListItem>
              ))}
            </TagsList>
          )}
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}
