import axios from 'axios';

const baseURL = '/api/auth';

export function signup(username, email, password) {
  return axios.post(`${baseURL}/signup`, {
    username,
    email,
    password,
  });
}

export function login(username, password) {
  return axios.post(`${baseURL}/login`, {
    username,
    password,
  });
}
