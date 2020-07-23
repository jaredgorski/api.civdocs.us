import {Request, Response} from 'express';
import {author, homepage, version} from '../../package.json';

export const index = (req: Request, res: Response) => {
  res.json({ author, homepage, version });
}
