
export function checkAuth() {
  if (localStorage.getItem('chat-token')) {
    return true;
  }
  return false;
}