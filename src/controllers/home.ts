import {Request, Response} from 'express';
import {author, homepage, version} from '../../package.json';
import {documentIndexLink} from '../util/links';

export const index = (req: Request, res: Response) => {
  res.json({ author, homepage, version, document_index_link: documentIndexLink() });
}
