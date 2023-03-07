import cors from 'utils/cors';
import posts from 'data/posts.json';
import fs from 'fs';

export default async function handler(req, res) {
  await cors(req, res);
  const { postId, comment } = req.body;
  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = posts[postIndex];
  const cComments = post.data.comments || [];
  post.data.comments = [comment, ...cComments];

  await fs.writeFile('src/data/posts.json', JSON.stringify(posts), async (err) => {
    if (err) throw err;
    return res.status(200).json({
      posts
    });
  });
}
