// project imports
import { JWT_API } from 'config';
import cors from 'utils/cors';
import { verify } from 'jsonwebtoken';
import users from 'data/users.json';

// constant
const JWT_SECRET = JWT_API.secret;

export default async function handler(req, res) {
  await cors(req, res);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token Missing' });
  }
  const accessToken = `${authorization}`.split(' ')[1];
  const data = verify(accessToken, JWT_SECRET);
  const userId = typeof data === 'object' ? data?.userId : '';
  const user = users.find((_user) => _user.id === userId);

  if (!user) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
}
