import {Request, Response} from 'express';
import {fetchDocumentEnum, fetchDocumentContent, fetchDocumentData, fetchDocumentIndex, fetchDocumentSections} from '../data/docs';
import {toHyphenCase} from '../util/string';
import {getSectionLinks, getParagraphLinks} from '../util/links';
import {addHyphenCaseTitleToRows, addDocumentLinkToRows, transformRows, addSectionLinksToRows} from '../util/transform';

const transformSectionRows = (rows: any) => {
  for (let i = 0; i < rows.length; i++) {
    const {title, document_title} = rows[i];
    const hyphen_case_title = toHyphenCase(title);
    const document_hyphen_case_title = toHyphenCase(document_title);
    rows[i] = {
      ...rows[i],
      hyphen_case_title,
      document_hyphen_case_title,
    };
  }

  return rows;
}

export const index = async (req: Request, res: Response) => {
  let result = await fetchDocumentIndex().then(addHyphenCaseTitleToRows).then(addDocumentLinkToRows);

  res.json(result);
}

export const getDocument = async (req: Request, res: Response) => {
  let result = {};

  try {
    const {document, section, paragraph} = req.params;
    const {verbose, limit, offset} = req.query as any;

    const documentEnum: any = await fetchDocumentEnum();

    const sanitized = {
      document: documentEnum[document] || null,
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

      let data: any = docData[0] || {};
      data.hyphen_case_title = toHyphenCase(data.title);

      if (sanitized.document && !sanitized.section) {
        const docSections = await fetchDocumentSections(sanitized.document)
          .then(transformRows(transformSectionRows))
          .then(addSectionLinksToRows);
        data = {...data, sections: docSections};
      } else if (sanitized.section && !sanitized.paragraph) {
        data.document_hyphen_case_title = toHyphenCase(data.document_title);
        const sectionLinks = getSectionLinks(data);
        data = {
          ...data,
          ...sectionLinks,
        }
      } else if (sanitized.paragraph) {
        data.document_hyphen_case_title = toHyphenCase(data.document_title);
        const paragraphLinks = getParagraphLinks(data);
        data = {
          ...data,
          ...paragraphLinks,
        }
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
