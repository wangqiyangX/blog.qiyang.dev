import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { i18n, isLocale } from '@/lib/i18n';

export const revalidate = false;

export function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang');
  const locale = lang && isLocale(lang) ? lang : i18n.defaultLanguage;

  return new Response(llms(source).index(locale));
}
