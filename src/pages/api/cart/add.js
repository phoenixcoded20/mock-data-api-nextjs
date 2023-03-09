import { filter } from 'lodash';
import { Chance } from 'chance';
import cors from 'utils/cors';

const chance = new Chance();

let inCartProduct;
let newProduct;
let subtotal;
let latestProducts;

export default async function handler(req, res) {
  await cors(req, res);
  const { product, products } = req.body;
  newProduct = { ...product, itemId: chance.timestamp() };
  subtotal = newProduct.quantity * newProduct.offerPrice;

  inCartProduct = filter(products, {
    id: newProduct.id,
    color: newProduct.color,
    size: newProduct.size
  });
  if (inCartProduct && inCartProduct.length > 0) {
    const newProducts = products.map((item) => {
      if (newProduct.id === item.id && newProduct.color === item.color && newProduct.size === item.size) {
        return { ...newProduct, quantity: newProduct.quantity + inCartProduct[0].quantity };
      }
      return item;
    });
    latestProducts = newProducts;
  } else {
    latestProducts = [...products, newProduct];
  }
  return res.status(200).json({ products: latestProducts, subtotal });
}
