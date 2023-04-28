import cors from 'utils/cors';
import dashboard from 'data/dashboard.json';
import { NO_AUTHENTICATION_REQUIRED } from 'config';

export default async function handler(req, res) {
  await cors(req, res, NO_AUTHENTICATION_REQUIRED);
  return res.status(200).json({ dashboard });
}
