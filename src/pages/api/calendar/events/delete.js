import calendarEvents from 'data/calendar';
import cors from 'utils/cors';
import _ from 'lodash';

export default async function handler(req, res) {
  await cors(req, res);
  const { eventId } = req.body;
  let events = calendarEvents;
  events = _.reject(events, { id: eventId });

  return res.status(200).json(events);
}
