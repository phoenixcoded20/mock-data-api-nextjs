import calendarEvents from 'data/calendar-events.json';
import cors from 'utils/cors';
import fs from 'fs';
import _ from 'lodash';

export default async function handler(req, res) {
  await cors(req, res);
  const { eventId } = req.body;
  let events = calendarEvents;
  events = _.reject(events, { id: eventId });

  await fs.writeFile('src/data/calendar-events.json', JSON.stringify(events), async (err) => {
    if (err) throw err;
    return res.status(200).json(events);
  });
}
