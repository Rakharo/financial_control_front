export function formatDateBR(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR");
}