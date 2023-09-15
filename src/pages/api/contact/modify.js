import contacts from 'data/contact.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const user = req.body;
  if (user.id) {
    const index = contacts.findIndex((u) => u.id === user.id);
    if (index > -1) {
      contacts[index] = { ...contacts[index], ...user };
    }
  } else {
    contacts.push({ ...user, id: contacts.length + 1 });
  }
  return res.status(200).json(contacts);
}
