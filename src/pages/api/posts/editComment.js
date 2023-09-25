import cors from 'utils/cors';
import posts from 'data/posts.json';

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

  return res.status(200).json({ posts: filterPosts });
}
