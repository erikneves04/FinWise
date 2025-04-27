import { api } from "../../api";

export interface GetUserData{
  id: number;
  name: string;
  cellNumber: string;
  email: string;
  company: string;
  role: string;
  birthdate: string;
}

export async function GetUser() {
  const res = await api.get(`usuario`);
  return res.data;
}