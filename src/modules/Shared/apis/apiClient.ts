import axios from 'axios';
import '../../../helpers/interceptors'; // Asegurar que los interceptores estén configurados

type RequestData = unknown;

class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get<T>(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(endpoint: string, data: RequestData): Promise<T> {
    try {
      const response = await axios.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(endpoint: string, data: RequestData): Promise<T> {
    try {
      const response = await axios.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      // Extraer errores de validación de ASP.NET Core
      if (data?.errors) {
        const firstError = Object.values(data.errors)[0];
        if (Array.isArray(firstError) && firstError[0]) {
          return new Error(firstError[0]);
        }
      }

      // Otros formatos de error
      const message =
        (typeof data === 'string' && data) ||
        data?.message ||
        data?.detail ||
        data?.title ||
        error.message ||
        'An unexpected error occurred';
      return new Error(message);
    }
    return new Error('An unexpected error occurred');
  }
}

export const apiClient = new ApiClient();
