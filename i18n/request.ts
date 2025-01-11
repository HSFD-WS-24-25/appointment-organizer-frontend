import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import deepmerge from 'deepmerge';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const userTranslation = (await import(`../app/[locale]/components/translations/${locale}.json`)).default;
  const defaultTranslation = (await import(`../app/[locale]/components/translations/en.json`)).default;
  const translation = deepmerge(defaultTranslation, userTranslation);
 
  return {
    locale,
    messages: translation
  };
});