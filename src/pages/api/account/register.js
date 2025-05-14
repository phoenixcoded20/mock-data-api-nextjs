import cors from 'utils/cors';
import users from 'data/users.json';
import { messages } from 'utils';

export default async function handler(req, res) {
  await cors(req, res, false);
  const { id, email, password, firstName, lastName } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: messages.errorMessages.enterEmailAndPassword });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({ message: messages.errorMessages.enterName });
  }

  const isAlreadyRegistered = users.find((_user) => _user.email === email);

  if (isAlreadyRegistered) {
    return res.status(400).json({ message: messages.errorMessages.alreadyRegistered });
  }
  const user = {
    id,
    email,
    password,
    name: `${firstName} ${lastName}`,
    role: 'User'
  };

  users.push(user);

  return res.status(200).json(users);
}
