import friends from 'data/friend-request.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { key } = req.body;

  const results = friends.filter((row) => {
    let matches = true;

    const properties = ['name', 'mutual'];
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
