import axios from "axios";

const client = axios.create({
  baseURL: "https://k2-back.onrender.com/",
});

export function postLogin({ email, password }) {
  return client.post("login", { email, password }).then((response) => response);
}

export function registerUser({ email, password_1, password_2 }) {
  return client
    .post("register", { email, password_1, password_2 })
    .then((response) => response);
}

export default client;
