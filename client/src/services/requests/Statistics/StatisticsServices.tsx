import { api } from "../../api";

export interface CategoryResponse {
    categoria: string,
    valorTotal: number,
    quantidade: number
}

export async function GetCategories(month:any, year:any) {
    const res = await api.get<CategoryResponse[]>(`estatisticas/despesas-por-categoria?mes=${month}&ano=${year}`);
    return res.data;
}