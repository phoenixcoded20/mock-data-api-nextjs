import usersS1 from 'data/user-list-s1.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).send({ users_s1: usersS1 });
}
