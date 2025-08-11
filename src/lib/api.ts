// src/lib/api.ts
export const API_BASE = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_URL;
