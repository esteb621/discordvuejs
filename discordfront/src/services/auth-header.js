export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('jwt'));
  
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }