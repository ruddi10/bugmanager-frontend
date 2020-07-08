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

// export function isNew(date){

// }
const Search_Pattern = 'src="/images/uploads/';
const Site_Domain = "http://127.0.0.1:8000";
const Replace_With = `src=\"${Site_Domain}/images/uploads/`;
export function RichTextImagePath(text) {
  return text.replace(Search_Pattern, Replace_With);
}
