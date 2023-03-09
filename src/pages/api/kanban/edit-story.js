import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { userStory, story } = req.body;
  userStory.splice(
    userStory.findIndex((s) => s.id === story.id),
    1,
    story
  );

  const result = {
    userStory
  };

  return res.status(200).json({
    ...result
  });
}
