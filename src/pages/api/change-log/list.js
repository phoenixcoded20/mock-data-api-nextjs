import cors from 'utils/cors';
import changeLog from 'data/change-log.json';

export default async function handler(req, res) {
  await cors(req, res);

  const reversedChangeLog = [...changeLog].reverse();

  return res.status(200).json({ changeLog: reversedChangeLog });
}
