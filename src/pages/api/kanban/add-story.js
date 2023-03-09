import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { userStory, story, userStoryOrder } = req.body;
  const result = {
    userStory: [...userStory, story],
    userStoryOrder: [...userStoryOrder, story.id]
  };
  return res.status(200).json({ ...result });
}
