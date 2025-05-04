import { api } from "../../api";
export interface GetUserData {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
  saldo: number;
}

export async function GetUser() {
  const res = await api.get(`/usuario`);
  return res.data;
}