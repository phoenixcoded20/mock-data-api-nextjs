import jwt from 'jsonwebtoken';
import { JWT_API } from 'config';
import cors from 'utils/cors';
import users from 'data/users.json';
import { messages } from 'utils';

// constant
const JWT_SECRET = JWT_API.secret;
const JWT_EXPIRES_TIME = JWT_API.timeout;

export default async function handler(req, res) {
  await cors(req, res, false);
  const { email, password } = req.body;
  const user = users.find((_user) => _user.email === email);

  if (!user) {
    return res.status(400).json({ message: messages.errorMessages.verifyEmailAndPassword });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: messages.errorMessages.invalidPassword });
  }

  const serviceToken = jwt.sign({ userId: user.id }, JWT_SECRET || '', {
    expiresIn: JWT_EXPIRES_TIME
  });
  return res.status(200).json({
    serviceToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
}
