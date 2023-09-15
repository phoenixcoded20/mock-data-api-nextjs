import calendarEvents from 'data/calendar';
import cors from 'utils/cors';
import _ from 'lodash';

export default async function handler(req, res) {
  await cors(req, res);
  const { eventId, update } = req.body;
  let events = calendarEvents;

  events = _.map(events, (_event) => {
    if (_event.id === eventId) {
      _.assign(_event, { ...update });
    }
    return _event;
  });

  return res.status(200).json({ events });
}
