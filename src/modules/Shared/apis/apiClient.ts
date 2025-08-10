import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { authHelper } from '../../../helpers/authHelper';

// Base única: VITE_API_URL (prod) o '/api' (dev)
const envApiUrl =
  (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';
const API_BASE_URL = envApiUrl.replace(/\/$/, '');

// Relaxed to accept any JSON-serializable payload
type RequestData = unknown;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Request interceptor - agrega autenticación
    this.client.interceptors.request.use(
      config => {
        // Autenticación
        const token = authHelper.getToken();
        if (token) {
          config.headers = config.headers ?? {};
          (config.headers as Record<string, string>).Authorization =
            `Bearer ${token}`;
        }
        // Log para verificar base en prod
        // eslint-disable-next-line no-console
        if (import.meta.env.PROD)
          console.log('[api] baseURL:', this.client.defaults.baseURL);
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        // Manejo básico de errores - se expandirá más adelante
        console.error(
          'API Error:',
          error.response?.status,
          error.response?.data
        );
        return Promise.reject(error);
      }
    );
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.get<T>(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(endpoint: string, data: RequestData): Promise<T> {
    try {
      const response = await this.client.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(endpoint: string, data: RequestData): Promise<T> {
    try {
      const response = await this.client.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as unknown;
      // Soportar backend que devuelve mensaje como string o en distintas claves
      const respMsg =
        (typeof data === 'string' ? data : undefined) ||
        (typeof (data as any)?.message === 'string'
          ? (data as any).message
          : undefined) ||
        (typeof (data as any)?.detail === 'string'
          ? (data as any).detail
          : undefined) ||
        (typeof (data as any)?.title === 'string'
          ? (data as any).title
          : undefined);
      const message =
        respMsg || error.message || 'An unexpected error occurred';
      return new Error(message);
    }
    return new Error('An unexpected error occurred');
  }
}

export const apiClient = new ApiClient();
