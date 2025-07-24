import DOMPurify from 'dompurify';

import { isClient } from './is-client';

export const createMarkUp = (html: string) => {
  const sanitizedHtml = isClient ? DOMPurify.sanitize(html) : html;
  return { __html: sanitizedHtml };
};
