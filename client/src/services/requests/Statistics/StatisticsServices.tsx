import { api, hasToken } from "../../api";

function formatDate(data: string): string {
    const date = data.split('T')[0]
    return date
}

export interface CategoryResponse {
    categoria: string,
    valorTotal: number,
    quantidade: number
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GetCategories(month:any, year:any) {
    if (!hasToken()) 
        await sleep(200)

    const res = await api.get<CategoryResponse[]>(`estatisticas/despesas-por-categoria?mes=${month}&ano=${year}`);
    return res.data;
}

export interface TotalResponse {
    referencia: string,
    valorTotalReceitas: number,
    valorTotalDespesas: number
}

export async function GetLines(month:any, year:any) {
    if (!hasToken()) 
        await sleep(200)

    const res = await api.get<TotalResponse[]>(`estatisticas/totais-por-dia?mes=${month}&ano=${year}`);

    const updatedData = res.data.map(item => ({
        ...item,
        referencia: formatDate(item.referencia),
      }))

    return updatedData;
}