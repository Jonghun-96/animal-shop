


const LIKES_KEY = 'likes';



export function getLikes() {
    const data = localStorage.getItem(LIKES_KEY);
    return data ? JSON.parse(data) : null;
  }



export function saveLikes(likes) {
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
}
