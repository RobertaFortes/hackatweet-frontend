const PROD_API_URL = 'https://hackatweet-backend-iota-nine.vercel.app';
const DEV_API_URL = 'http://localhost:3000';

// Use the env var when set, otherwise fall back to the prod URL in
// production and to localhost during local development.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production' ? PROD_API_URL : DEV_API_URL);
