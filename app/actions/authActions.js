
export function checkAuth() {
  if (localStorage.getItem('username')) {
    return true;
  }
  return false;
}