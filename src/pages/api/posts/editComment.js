import cors from 'utils/cors';
import posts from 'data/posts.json';
import fs from 'fs';

export default async function handler(req, res) {
  await cors(req, res);
  const { key, id } = req.body;
  const filterPosts = posts.map((post) => {
    if (post.id === key) {
      const cComments = post.data.comments || [];
      post.data.comments = [id, ...cComments];
      return post;
    }
    return post;
  });

  await fs.writeFile('src/data/posts.json', JSON.stringify(filterPosts), async (err) => {
    if (err) throw err;
    return res.status(200).json({
      posts: filterPosts
    });
  });
}
