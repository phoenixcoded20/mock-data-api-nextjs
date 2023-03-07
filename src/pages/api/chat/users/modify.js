import users from 'data/chat.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const user = req.body;
  if (user.id) {
    const index = users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      users[index] = { ...users[index], ...user };
    }
  } else {
    users.push({ ...user, id: users.length + 1 });
  }
  return res.status(200).json([]);
}
