import cors from 'utils/cors';
import posts from 'data/posts.json';

export default async function handler(req, res) {
  await cors(req, res);
  const { postId, commentId } = req.body;
  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = posts[postIndex];
  const cComments = post.data.comments || [];
  const commentIndex = cComments.findIndex((x) => x.id === commentId);
  const comment = { ...cComments[commentIndex] };
  if (comment && comment.data && comment.data.likes) comment.data.likes.like = !comment.data.likes.like;
  if (comment && comment.data && comment.data.likes)
    comment.data.likes.value = comment.data.likes.like ? comment.data.likes.value + 1 : comment.data.likes.value - 1;
  if (post && post.data && post.data.comments) post.data.comments[commentIndex] = comment;
  return res.status(200).json({ posts });
}
