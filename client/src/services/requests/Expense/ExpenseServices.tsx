import { api } from "../../api";

export interface ExpenseData {
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

function ConvertObjectToBody(data:any): ExpenseData {
    return {
        id: undefined,
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
        date: formatDate(item.data)
    }));
}

export async function GetExpenses() {
    const res = await api.get<ExpenseData[]>(`/usuario/despesas`);
    var result = ConvertBodyResponse(res.data)
    return result;
}

export async function CreateExpense(body: any) {
    console.log("Pré: ")
    console.log(body)
    console.log("Pós: ")
    console.log(ConvertObjectToBody(body))
    const res = await api.post(`/usuario/despesas`, ConvertObjectToBody(body));
    
    return res.data;
}

export async function UpdateExpense(id:number, body: any) {
    console.log(ConvertObjectToBody(body))
    const res = await api.patch(`/usuario/despesas/${id}`, ConvertObjectToBody(body));
    return res.data;
}

export async function DeleteExpense(id:number) {
    const res = await api.delete(`/usuario/despesas/${id}`);
    return res.data;
}