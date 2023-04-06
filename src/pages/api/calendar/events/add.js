import calendarEvents from 'data/calendar-events.json';
import cors from 'utils/cors';
import { v4 as UIDV4 } from 'uuid';
import fs from 'fs';

export default async function handler(req, res) {
  await cors(req, res);
  const { allDay, description, color, textColor, end, start, title } = req.body;
  let events = calendarEvents;
  const event = {
    id: UIDV4(),
    allDay,
    description,
    color,
    textColor,
    end,
    start,
    title
  };

  events = [...events, event];
  return res.status(200).json(events);
}
