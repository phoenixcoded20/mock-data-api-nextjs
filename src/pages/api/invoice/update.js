import invoice from 'data/invoice.json';
import cors from 'utils/cors';

// third-party
import { map, assign } from 'lodash';

export default async function handler(req, res) {
  await cors(req, res);
  const { list } = req.body;

  let event = null;
  map(invoice, (_event) => {
    if (_event.id === list.id) {
      assign(_event, { ...list });
      event = _event;
    }

    return _event;
  });

  return res.status(200).json(event);
}
