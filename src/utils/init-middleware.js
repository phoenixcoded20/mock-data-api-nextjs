// project imports
import { AUTHENTICATION_REQUIRED, JWT_API } from 'config';
import { verify } from 'jsonwebtoken';
import users from 'data/users.json';

// constant
const JWT_SECRET = JWT_API.secret;

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function initMiddleware(middleware) {
  return (req, res, validateToken = AUTHENTICATION_REQUIRED) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        if (validateToken) {
          const { authorization } = req.headers;
          if (!authorization) {
            return res.status(401).json({ message: 'Token Missing' });
          }
          const accessToken = `${authorization}`.split(' ')[1];
          let data = {};
          try {
            data = verify(accessToken, JWT_SECRET);
          } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
          }
          const userId = typeof data === 'object' ? data?.userId : '';
          const user = users.find((_user) => _user.id === userId);
          if (!user) {
            return res.status(401).json({ message: 'Invalid Token' });
          }
        }
        return resolve(result);
      });
    });
}
