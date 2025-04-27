import { api } from "../../api";

export interface UpdateUserData {
  nome?: string;
  email?: string;
  celular?: string;
  senha?: string;
  dataNascimento?: string;
  saldo?: number;
}

export async function UpdateUser(body: UpdateUserData) {
  const res = await api.patch(`/usuario`, body);
  return res.data;
}