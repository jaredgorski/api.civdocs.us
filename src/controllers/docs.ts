import {Request, Response} from 'express';
import {fetchDocumentEnum, fetchDocumentContent, fetchDocumentData, fetchDocumentIndex, fetchDocumentSections} from '../data/docs';
import {toHyphenCase} from '../util/string';

export const index = (db: any) => {
  return async (req: Request, res: Response) => {
    let result = await fetchDocumentIndex(db);

    for (let i = 0; i < result.length; i++) {
      const {title} = result[i] as any;
      const hyphen_case_title = toHyphenCase(title);
      result[i] = {
        ...result[i],
        hyphen_case_title,
      };
    }

    res.json(result);
  }
}

export const getDocument = (db: any) => {
  return async (req: Request, res: Response) => {
    let result = {};

    try {
      const {document, section, paragraph} = req.params;
      const {verbose, limit, offset} = req.query as any;

      const documentEnum: any = await fetchDocumentEnum(db);

      const sanitized = {
        document: documentEnum[document] || null,
        section: parseInt(section, 10),
        paragraph: parseInt(paragraph, 10),
        verbose: verbose === 'true',
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      };

      const dbContent = await fetchDocumentContent(db, sanitized.document, sanitized.section, sanitized.paragraph, sanitized.limit, sanitized.offset);
      type DbContentItem = {
        content: string,
      };
      const content = dbContent.map((c: DbContentItem) => c.content);

      if (sanitized.verbose) {
        const docData = await fetchDocumentData(db, sanitized.document, sanitized.section, sanitized.paragraph);

        let data = docData[0] || {};

        if (!sanitized.section) {
          const docSections = await fetchDocumentSections(db, sanitized.document);
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
}
