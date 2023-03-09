import { filter } from 'lodash';
import cors from 'utils/cors';

let oldSubTotal;
let subtotal;
let latestProducts;
let result;

export default async function handler(req, res) {
  await cors(req, res);
  const { id, quantity, products } = req.body;
  result = filter(products, { itemId: id });
  subtotal = quantity * result[0].offerPrice;
  oldSubTotal = 0;

  latestProducts = products.map((item) => {
    if (id === item.itemId) {
      oldSubTotal = item.quantity * (item.offerPrice || 0);
      return { ...item, quantity };
    }
    return item;
  });
  return res.status(200).json({ products: latestProducts, oldSubTotal, subtotal });
}
