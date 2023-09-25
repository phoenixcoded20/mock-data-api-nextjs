import cors from 'utils/cors';
import posts from 'data/posts.json';

export default async function handler(req, res) {
  await cors(req, res);
  const { postId } = req.body;
  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = { ...posts[postIndex] };
  post.data = { ...post.data };
  post.data.likes = { ...post.data.likes };
  post.data.likes.like = !post.data.likes.like;
  post.data.likes.value = post.data.likes.like ? post.data.likes.value + 1 : post.data.likes.value - 1;
  posts[postIndex] = post;
  return res.status(200).json({ posts });
}
