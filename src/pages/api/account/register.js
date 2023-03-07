import cors from 'utils/cors';
import users from 'data/users.json';
import fs from 'fs';
import { messages } from 'utils';

export default async function handler(req, res) {
  await cors(req, res);
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
    name: `${firstName} ${lastName}`
  };

  users.push(user);

  await fs.writeFile('src/data/users.json', JSON.stringify(users), async (err) => {
    if (err) throw err;
    return res.status(200).json(users);
  });
  return false;
}
