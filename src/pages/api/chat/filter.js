import chatHistories from 'data/chat-history.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { user } = req.body;
  const result = chatHistories?.filter((item) => item.from === user || item.to === user);
  return res.status(200).json(result);
}
