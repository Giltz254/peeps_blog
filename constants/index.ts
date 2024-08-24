export const DEFAULT_LOGIN_REDIRECT = "/"
export const DEFAULT_WEBSITE_URL = "http://localhost:3000"
export const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');