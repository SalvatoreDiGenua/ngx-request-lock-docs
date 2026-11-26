import type { Language } from '../i18n/language.service';
import { localizedPath } from '../i18n/locale-routes';
import type { RouteSeoData } from './seo-router-service';

const ORIGIN = 'https://ngx-request-lock-docs.netlify.app';

interface ItalianCopy {
  title: string;
  description: string;
  breadcrumb?: string;
}

/** Keep the English and Italian routes aligned without duplicating schema URLs. */
export function localizedSeo(
  source: RouteSeoData,
  path: string,
  language: Language,
  italian: ItalianCopy,
): RouteSeoData {
  if (language === 'en') return source;

  const url = `${ORIGIN}${localizedPath(path, language)}`;
  const data = source.structuredData;
  const items = data ? (Array.isArray(data) ? data : [data]) : [];
  const structuredData = items.map((item) => {
    if (item['@type'] === 'BreadcrumbList') {
      const crumbs = item['itemListElement'] as Record<string, unknown>[];
      return {
        ...item,
        itemListElement: crumbs.map((crumb, index) => ({
          ...crumb,
          name: index === 0 ? 'Home' : (italian.breadcrumb ?? italian.title),
          item: index === 0 ? `${ORIGIN}/it/` : url,
        })),
      };
    }
    return {
      ...item,
      name: item['name'] === 'ngx-request-lock' ? item['name'] : italian.title,
      headline: item['headline'] ? italian.title : undefined,
      description: italian.description,
      url,
      isPartOf: item['isPartOf']
        ? {
            ...(item['isPartOf'] as Record<string, unknown>),
            url: `${ORIGIN}/it/`,
          }
        : undefined,
    };
  });

  return {
    ...source,
    title: italian.title,
    description: italian.description,
    ogTitle: italian.title,
    ogDescription: italian.description,
    twitterTitle: italian.title,
    twitterDescription: italian.description,
    structuredData,
  };
}
