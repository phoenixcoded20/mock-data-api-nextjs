import prebuildPrompts from 'data/hero-prebuild-prompts.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const data = Array.isArray(prebuildPrompts) && prebuildPrompts.length > 0 ? prebuildPrompts : [];
  return res.status(200).json({ prebuildPrompts: data });
}
