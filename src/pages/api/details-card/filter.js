import users from 'data/details-card.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { key } = req.body;

  const results = users.filter((row) => {
    let matches = true;

    const properties = ['name', 'role', 'about', 'email', 'contact', 'location'];
    let containsQuery = false;

    properties.forEach((property) => {
      if (row[property].toString().toLowerCase().includes(key.toString().toLowerCase())) {
        containsQuery = true;
      }
    });

    if (!containsQuery) {
      matches = false;
    }
    return matches;
  });
  return res.status(200).json({ results });
}
