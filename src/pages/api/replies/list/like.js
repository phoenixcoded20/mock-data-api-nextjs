import cors from 'utils/cors';
import posts from 'data/posts.json';

export default async function handler(req, res) {
  await cors(req, res);
  const { postId, commentId, replayId } = req.body;
  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = posts[postIndex];
  const cComments = post.data.comments || [];
  const commentIndex = cComments.findIndex((x) => x.id === commentId);
  const comment = { ...cComments[commentIndex] };
  const replayIndex = comment?.data?.replies?.findIndex((x) => x.id === replayId);
  if (replayIndex !== undefined) {
    if (comment && comment.data && comment.data.replies) {
      const reply = { ...comment.data.replies[replayIndex] };
      if (reply && reply.data && reply.data.likes) {
        reply.data.likes.like = !reply.data.likes.like;
        reply.data.likes.value = reply.data.likes.like ? reply.data.likes.value + 1 : reply.data.likes.value - 1;
      }
      comment.data.replies[replayIndex] = reply;
      if (post && post.data && post.data.comments) post.data.comments[commentIndex] = comment;
    }
  }
  return res.status(200).json({ posts });
}
