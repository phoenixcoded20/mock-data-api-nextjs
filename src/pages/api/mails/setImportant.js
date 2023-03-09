import mailsDetails from 'data/mails.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { id } = req.body;
  let mails = mailsDetails;
  const mailIndex = mails.findIndex((i) => i.id === id);
  mails[mailIndex] = {
    ...mails[mailIndex],
    important: !mails[mailIndex].important
  };
  mails = [...mails];
  return res.status(200).json([]);
}
