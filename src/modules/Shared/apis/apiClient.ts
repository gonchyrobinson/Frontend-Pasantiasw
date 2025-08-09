import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { authHelper } from '../../../helpers/authHelper';

// Usar la URL base del backend en prod y el proxy "/api" en dev
const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL as
  | string
  | undefined;
const API_BASE_URL = serverBaseUrl
  ? `${serverBaseUrl.replace(/\/$/, '')}/api`
  : '/api';

// Define a generic type for request data
type RequestData = Record<string, unknown>;

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

    // Request interceptor - agrega autenticación y asegura URL absoluta en prod
    this.client.interceptors.request.use(
      config => {
        // Autenticación
        const token = authHelper.getToken();
        if (token) {
          config.headers = config.headers ?? {};
          (config.headers as Record<string, string>).Authorization =
            `Bearer ${token}`;
        }
        // Asegurar URL absoluta cuando el endpoint comience con "/api/" y haya base en prod
        if (
          serverBaseUrl &&
          config.url &&
          (config.url.startsWith('/api/') || config.url.startsWith('api/'))
        ) {
          const trimmedBase = serverBaseUrl.replace(/\/$/, '');
          config.baseURL = undefined;
          config.url = `${trimmedBase}${config.url.startsWith('/') ? '' : '/'}${config.url}`;
        }
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
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    }
    return new Error('An unexpected error occurred');
  }
}

export const apiClient = new ApiClient();
