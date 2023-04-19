import store from "@/store";



export default function authHeader() {
  let user = store.getters['auth/getUser'];
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
