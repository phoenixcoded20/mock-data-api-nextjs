import mails from 'data/mails.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { filter } = req.body;
  const getInboxMails = () => mails.filter((item) => !item.spam);
  const getSentMails = () => mails.filter((item) => item.sent);
  const getDraftMails = () => mails.filter((item) => item.draft);
  const getSpamMails = () => mails.filter((item) => item.spam);
  const getTrashMails = () => mails.filter((item) => item.trash);
  const getStarredMails = () => mails.filter((item) => item.starred);
  const getImportantMails = () => mails.filter((item) => item.important);
  const getPromotionsMails = () => mails.filter((item) => item.promotions);
  const getForumMails = () => mails.filter((item) => item.forums);

  let result = [];
  switch (filter) {
    case 'inbox':
      result = getInboxMails();
      break;
    case 'sent':
      result = getSentMails();
      break;
    case 'draft':
      result = getDraftMails();
      break;
    case 'spam':
      result = getSpamMails();
      break;
    case 'trash':
      result = getTrashMails();
      break;
    case 'starred':
      result = getStarredMails();
      break;
    case 'important':
      result = getImportantMails();
      break;
    case 'promotions':
      result = getPromotionsMails();
      break;
    case 'forums':
      result = getForumMails();
      break;
    case 'all':
    default:
      result = mails;
      break;
  }

  return res.status(200).json(result);
}
