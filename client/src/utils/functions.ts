export const handleApiError = (err: any) => {
  // Receives error and returns the error string
  if (err.response && err.response.data) {
    if (err.response.data.errors && err.response.data.errors.length > 0) {
      console.log(err.response.data.errors[0].msg);
      return err.response.data.errors[0].msg;
    } else {
      console.log(err.response.data);
      return err.response.data;
    }
  } else {
    console.log("Erro desconhecido:", err.message);
  }
  return "Erro desconhecido.";
};

export function textLimit(title: any, limit: number) {
  // Limits text size
  if (title) {
    if (title.length > limit) {
      return (title.substring(0, limit) + "...") as string;
    } else {
      return title;
    }
  }
}

export function convertToDateISOString(dateString) {
  const parts = dateString.split("/"); // Divide a data em partes
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Verifica se os valores são válidos
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      // Constrói a data no formato ISO-8601
      const isoDate = new Date(year, month - 1, day).toISOString();
      return isoDate;
    }
  }
  return null; // Retorna null se a data de entrada não for válida
}

export function isEmptyField(data: object, ignoreAttributes: string[] = []) {
  const keys = Object.keys(data);
  for (const key of keys) {
    if (ignoreAttributes.includes(key)) {
      continue;
    }
    if (data[key] === "") {
      return true;
    }
  }
  return false;
}

export function formatInputDate(inputDate: string): string {
  const numericValue = inputDate.replace(/\D/g, "");
  if (numericValue.length <= 2) {
    return numericValue;
  } else if (numericValue.length <= 4) {
    return `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
  } else {
    return `${numericValue.slice(0, 2)}/${numericValue.slice(
      2,
      4
    )}/${numericValue.slice(4, 8)}`;
  }
}

export function formatInputCPF(inputCPF: string): string {
  const numericValue = inputCPF.replace(/\D/g, "");

  if (numericValue.length <= 3) {
    return numericValue;
  } else if (numericValue.length <= 6) {
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
  } else if (numericValue.length <= 9) {
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
  } else {
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
  }
}

export function formatInputCNPJ(inputCNPJ: string): string {
  const numericValue = inputCNPJ.replace(/\D/g, "");

  if (numericValue.length <= 2) {
    return numericValue;
  } else if (numericValue.length <= 5) {
    return `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
  } else if (numericValue.length <= 8) {
    return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5)}`;
  } else if (numericValue.length <= 12) {
    return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8)}`;
  } else {
    return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8, 12)}-${numericValue.slice(12, 14)}`;
  }
}

export function handleValueChange(text: string): string {
  let numericText = text.replace(/[^0-9]/g, "");
  let decimalPart = numericText.slice(-2);
  let integerPart = numericText.slice(0, -2).replace(/^0+/, "");
  if (integerPart === "") integerPart = "0";
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (!decimalPart) decimalPart = "00";
  const formattedValue = `${integerPart},${decimalPart}`;
  return formattedValue;
}



