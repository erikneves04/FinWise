import { api } from "../../api";

export interface RevenueData {
    id: number | undefined,
    descricao: string,
    valor: number,
    tipo: string,
    data: string,
}

function ConvertValue(strValue: string): number {
    const formattedValue = strValue.replace(/\./g, "").replace(",", ".");
    return parseFloat(formattedValue);
}

function ConvertValueToString(value: number): string {
    return value.toFixed(2).replace(".", ",");
}

function formatDate(data: string): string {
    const dateParts = data.split('T')[0].split('-');
    const day = dateParts[2].padStart(2, '0');
    const month = dateParts[1].padStart(2, '0');
    const year = dateParts[0];

    return `${day}/${month}/${year}`;
}

function ConvertObjectToBody(data:any): RevenueData {
    return {
        id: undefined,
        descricao: data.name,
        valor: ConvertValue(data.value),
        tipo: 'salario', //data.type,
        data: data.date + 'T00:00:00.000Z'
    }
}

function ConvertBodyResponse(list: RevenueData[]): any[] {
    return list.map(item => ({
        id: item.id,
        name: item.descricao,
        value: ConvertValueToString(item.valor),
        type: item.tipo,
        date: formatDate(item.data)
    }));
}

export async function GetRevenues() {
    const res = await api.get<RevenueData[]>(`/receitas`);
    return ConvertBodyResponse(res.data);
}

export async function CreateRevenue(body: any) {
    const res = await api.post(`/receitas`, ConvertObjectToBody(body));
    return res.data;
}

export async function UpdateRevenue(id:any, body: any) {
    const res = await api.patch(`/receitas/${id}`, ConvertObjectToBody(body));
    return res.data;
}

export async function DeleteRevenue(id:number) {
    const res = await api.delete(`/receitas/${id}`);
    return res.data;
}