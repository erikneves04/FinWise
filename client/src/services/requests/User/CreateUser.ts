import { api } from "../../api";

export interface CreateUserData {
  nome: string,
  email: string,
  senha: string,
  dataNascimento: string,
}

export async function CreateUser(body: CreateUserData) {
  const res = await api.post(`/usuario`, body);
  return res.data;
}