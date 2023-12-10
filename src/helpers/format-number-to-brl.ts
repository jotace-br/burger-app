export const numberToBRL = (value: number | undefined) => {
  if (value) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
};
