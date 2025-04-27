import { api } from "../../api";

export interface LoginData {
  email: string;
  senha: string;
}

export async function Login(body: LoginData) {
  const res = await api.post(`/usuario/login`, body);
  return res.data;
}