import jwtDecode from "jwt-decode";
export function getCurrentUser() {
  try {
    const token = localStorage.getItem("access");
    return jwtDecode(token).user_id;
  } catch (ex) {
    return null;
  }
}

export function isCurrentUser(requestedUser) {
  return getCurrentUser() == requestedUser;
}

export function getTotalPages(max, count) {
  if (max > count) return false;
  return Math.ceil(count / max);
}
