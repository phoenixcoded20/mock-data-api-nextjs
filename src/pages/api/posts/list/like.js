import cors from 'utils/cors';
import posts from 'data/posts.json';
import fs from 'fs';

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
  await fs.writeFile('src/data/posts.json', JSON.stringify(posts), async (err) => {
    if (err) throw err;
    return res.status(200).json({
      posts
    });
  });
}
