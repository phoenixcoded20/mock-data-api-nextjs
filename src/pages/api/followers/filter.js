import followers from 'data/followers.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { key } = req.body;

  const results = followers.filter((row) => {
    let matches = true;

    const properties = ['name', 'location', 'follow'];
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

  return res.status(200).send({ results });
}
