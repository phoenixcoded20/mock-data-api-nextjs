import cors from 'utils/cors';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  await cors(req, res);

  const { tech, productId } = req.query;

  if (!tech || !productId) {
    return res.status(400).json({ changeLog: [], message: 'tech and productId are required.' });
  }

  // Build the path to the tech-specific changelog file
  // e.g. /src/data/change-log/angular/mantis.json
  const filePath = path.join(process.cwd(), 'src', 'data', 'change-log', tech, `${productId}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ changeLog: [], message: `No changelog found for tech: ${tech} and product: ${productId}` });
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const changeLog = JSON.parse(fileContents);
    const reversedLogs = [...changeLog].reverse();
    return res.status(200).json({ changeLog: reversedLogs });
  } catch (error) {
    return res.status(500).json({ changeLog: [], message: 'Failed to read changelog file.' });
  }
}
