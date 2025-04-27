import { api } from "../../api";

export interface ExpenseData {
    id: number,
    descricao: string,
    valor: number,
    tipo: string,
    data: string,
}

function ConvertValue(strValue: string): number {
    const formattedValue = strValue.replace(",", ".");
    return parseFloat(formattedValue);
}

function ConvertValueToString(value: number): string {
    return value.toFixed(2).replace(".", ",");
}

function ConvertObjectToBody(data:any): ExpenseData {
    return {
        id: data.id,
        descricao: data.name,
        valor: ConvertValue(data.value),
        tipo: 'alimentacao', //data.type,
        data: data.date + 'T00:00:00.000Z'
    }
}

function ConvertBodyResponse(list: ExpenseData[]): any[] {
    return list.map(item => ({
        id: item.id,
        name: item.descricao,
        value: ConvertValueToString(item.valor),
        type: item.tipo,
        date: item.data
    }));
}

export async function GetExpenses() {
    const res = await api.get<ExpenseData[]>(`/usuario/despesas`);
    return ConvertBodyResponse(res.data);
}

export async function CreateExpense(body: any) {
    console.log(ConvertObjectToBody(body))
    const res = await api.post(`/usuario/despesas`, ConvertObjectToBody(body));
    
    return res.data;
}

export async function UpdateExpense(id:number, body: any) {
    const res = await api.patch(`/usuario/despesas/${id}`, ConvertObjectToBody(body));
    return res.data;
}

export async function DeleteExpense(id:number) {
    const res = await api.delete(`/usuario/despesas/${id}`);
    return res.data;
}