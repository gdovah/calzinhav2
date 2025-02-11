
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const calculateTotal = (hourlyRate: number, weeklyHours: number, weeks: number): number => {
  return hourlyRate * weeklyHours * weeks;
};
