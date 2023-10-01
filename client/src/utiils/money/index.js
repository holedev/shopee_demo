export const handleMoneyVND = (money) => {
  return parseInt(money).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};
