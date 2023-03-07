import usersS2 from 'data/user-list-s2.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).send({ users_s2: usersS2 });
}
