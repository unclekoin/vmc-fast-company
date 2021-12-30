const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires-date";
const USER_ID_KEY = "user-local-id";

export const setTokens = ({ refreshToken, idToken, localId, expiresIn = 3600 }) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_ID_KEY, localId);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
};

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId(params) {
  return localStorage.getItem(USER_ID_KEY);
}

export function removeAuthData(params) {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresDate,
  getUserId,
  removeAuthData
};

export default localStorageService;
