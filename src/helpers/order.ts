export const getOrderCommerceItemUnitPrice = (
  commerceItem: Record<string, any>,
) => {
  const { listPrice, salePrice } = commerceItem.priceInfo;
  const hasSalePrice = salePrice && Number(salePrice) > 0;

  return hasSalePrice ? salePrice : listPrice;
};

export const getOrderCardType = (cardType: string) => {
  if (cardType.toLowerCase() === 'creditcard') return 'CREDITO';
  if (cardType.toLowerCase() === 'debitcard') return 'DEBITO';

  return cardType.toUpperCase();
};

export const getOrderDeliveryType = (dType: string) => {
  if (dType === 'Entrega Normal') return 'ENTREGA';
  if (dType === 'Entrega Express') return 'EXPRESS';
  if (dType === 'Entrega Drive Thru') return 'DRIVE';

  return dType.toUpperCase();
};
