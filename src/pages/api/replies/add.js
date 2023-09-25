import cors from 'utils/cors';
import posts from 'data/posts.json';

export default async function handler(req, res) {
  await cors(req, res);
  const { postId, commentId, reply } = req.body;
  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = posts[postIndex];
  const cComments = post.data.comments || [];
  const commentIndex = cComments.findIndex((x) => x.id === commentId);
  const comment = cComments[commentIndex];
  if (comment && comment.data && comment.data.replies) comment.data.replies = [...comment.data.replies, reply];

  return res.status(200).json({ posts });
}
