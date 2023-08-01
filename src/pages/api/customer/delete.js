import customers from 'data/customer.json';
import cors from 'utils/cors';

import _ from 'lodash';

export default async function handler(req, res) {
  await cors(req, res);
  const { customerId } = req.body;
  let newCustomer = customers;
  newCustomer = _.reject(newCustomer, { id: customerId });

  res.status(200).json(newCustomer);
}
