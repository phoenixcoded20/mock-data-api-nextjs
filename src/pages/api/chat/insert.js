import chatHistories from 'data/chat-history.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { from, to, text, time } = req.body;
  const result = chatHistories.push({ from, to, text, time });
  return res.status(200).json(result);
}
