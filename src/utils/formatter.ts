export function formatDateBR(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR");
}

export function formatCurrency(value: number) {
  const abs = Math.abs(value);

  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs);

  return value < 0 ? `R$ -${formatted}` : `R$ ${formatted}`;
};