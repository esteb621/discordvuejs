import store from "@/store";

class TokenService {
    getLocalRefreshToken() {
      const user = store.getters['auth/getUser'];
      return user?.refreshToken;
    }
  
    getLocalAccessToken() {
      const user = store.getters['auth/getUser'];
      return user?.accessToken;
    }
  
    updateLocalAccessToken(token) {
      let user = store.getters['auth/getUser'];
      user.accessToken = token;
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    getUser() {
      return store.getters['auth/getUser'];
    }
  
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    removeUser() {
      localStorage.removeItem("user");
    }
  }
  
  export default new TokenService();