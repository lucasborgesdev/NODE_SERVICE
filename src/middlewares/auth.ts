import { NextFunction, Request, Response } from 'express';

const errResponse = { message: 'the user is not authenticated' };

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const APP_PASSWORD = process.env.APP_PASSWORD || '';
  const APP_USER = process.env.APP_USER || '';

  // check for basic auth header
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf('Basic ') === -1
  ) {
    return res.status(401).json(errResponse);
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'ascii',
  );

  const [username, password] = credentials.split(':');

  if (username !== APP_USER || APP_PASSWORD !== password) {
    return res.status(401).json(errResponse);
  }

  return next();
};
