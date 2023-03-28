import invoiceEvents from 'data/invoice.json';
import cors from 'utils/cors';

import _ from 'lodash';

export default async function handler(req, res) {
  await cors(req, res);
  const { invoiceId } = req.body;
  let invoice = invoiceEvents;
  invoice = _.reject(invoice, { id: invoiceId });

  res.status(200).json(invoice);
}
