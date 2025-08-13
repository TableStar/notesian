import PocketBase from 'pocketbase';

const pocketbaseURL = import.meta.env.VITE_POCKETBASE_URL
if (!pocketbaseURL) {
  throw new Error("VITE_POCKETBASE_URL is not defined in your .env file");
}
export const pb = new PocketBase(pocketbaseURL);