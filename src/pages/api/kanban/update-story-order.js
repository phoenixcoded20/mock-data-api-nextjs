import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { userStoryOrder } = req.body;
  return res.status(200).json({ userStoryOrder });
}
