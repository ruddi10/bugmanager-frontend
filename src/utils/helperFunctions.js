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
const Search_Pattern = "<img";
const Replace_With = `<img style="max-height:500px" `;
export function RichTextImagePath(text) {
  return text.replace(Search_Pattern, Replace_With);
}
