const TOKEN_KEY = 'auth_token';

export const authHelper = {
  getToken: () => sessionStorage.getItem(TOKEN_KEY),
  saveToken: (token: string) => sessionStorage.setItem(TOKEN_KEY, token),
  removeToken: () => sessionStorage.removeItem(TOKEN_KEY),
  isAuthenticated: () => !!sessionStorage.getItem(TOKEN_KEY),
};
