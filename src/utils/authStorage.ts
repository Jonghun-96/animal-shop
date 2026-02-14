
const USERS_KEY = 'users';

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}




const LOGIN_USER_KEY = 'loginUser';

export function setLoginUser(userId) {
  localStorage.setItem(LOGIN_USER_KEY, userId);
}

export function getLoginUser() {
  return localStorage.getItem(LOGIN_USER_KEY);
}

export function logout() {
  localStorage.removeItem(LOGIN_USER_KEY);
}