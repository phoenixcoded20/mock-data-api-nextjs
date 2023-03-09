import mails from 'data/mails.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const getInboxMails = () => mails.filter((item) => !item.spam);
  const getSentMails = () => mails.filter((item) => item.sent);
  const getDraftMails = () => mails.filter((item) => item.draft);
  const getSpamMails = () => mails.filter((item) => item.spam);
  const getTrashMails = () => mails.filter((item) => item.trash);
  const getStarredMails = () => mails.filter((item) => item.starred);
  const getImportantMails = () => mails.filter((item) => item.important);
  const getPromotionsMails = () => mails.filter((item) => item.promotions);
  const getForumMails = () => mails.filter((item) => item.forums);
  return res.status(200).json({
    mails,
    unreadCount: {
      all: mails.filter((i) => !i.isRead).length,
      inbox: getInboxMails().filter((i) => !i.isRead).length,
      sent: getSentMails().filter((i) => !i.isRead).length,
      draft: getDraftMails().filter((i) => !i.isRead).length,
      spam: getSpamMails().filter((i) => !i.isRead).length,
      trash: getTrashMails().filter((i) => !i.isRead).length,
      starred: getStarredMails().filter((i) => !i.isRead).length,
      important: getImportantMails().filter((i) => !i.isRead).length,
      promotions: getPromotionsMails().filter((i) => !i.isRead).length,
      forums: getForumMails().filter((i) => !i.isRead).length
    }
  });
}
