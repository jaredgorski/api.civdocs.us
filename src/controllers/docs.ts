import {Request, Response} from 'express';
import {DOCUMENTS, fetchDocumentContent, fetchDocumentData, fetchDocumentIndex, fetchDocumentSections} from '../data/docs';

export const index = async (req: Request, res: Response) => {
  const result = await fetchDocumentIndex();

  res.json(result);
}

export const getDocument = async (req: Request, res: Response) => {
  let result = {};

  try {
    const {document, section, paragraph} = req.params;
    const {verbose, limit, offset} = req.query as any;

    const sanitized = {
      document: DOCUMENTS[document],
      section: parseInt(section, 10),
      paragraph: parseInt(paragraph, 10),
      verbose: verbose === 'true',
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    };

    const dbContent = await fetchDocumentContent(sanitized.document, sanitized.section, sanitized.paragraph, sanitized.limit, sanitized.offset);
    type DbContentItem = {
      content: string,
    };
    const content = dbContent.map((c: DbContentItem) => c.content);

    if (sanitized.verbose) {
      const docData = await fetchDocumentData(sanitized.document, sanitized.section, sanitized.paragraph);

      let data = docData[0] || {};

      if (!sanitized.section) {
        const docSections = await fetchDocumentSections(sanitized.document);
        data = {...data, sections: docSections};
      }

      result = {
        ...data,
        content,
      };
    } else {
      result = content;
    }
  } catch(error) {
    result = {error};
  }

  res.json(result);
}
