import cors from 'utils/cors';
import changeLog from 'data/change-log.json';

export default async function handler(req, res) {
  await cors(req, res);

  const { productId } = req.query;

  // If productId is provided and exists in the changelog object
  if (productId && changeLog[productId]) {
    const reversedLogs = [...changeLog[productId]].reverse();
    return res.status(200).json({ changeLog: reversedLogs });
  }

  return res.status(200).json({ changeLog: [] });
}
