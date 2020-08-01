import {toHyphenCase} from './string';
import {documentLink, getSectionLinks} from './links';

export function addHyphenCaseTitleToRows(rows: any) {
  for (let i = 0; i < rows.length; i++) {
    const {title} = rows[i] as any;
    if (!title) break;

    const hyphen_case_title = toHyphenCase(title);
    rows[i] = {
      ...rows[i],
      hyphen_case_title,
    };
  }

  return rows;
}

export function transformRows(fn: Function) {
  return (rows: any) => fn(rows);
}

export function addDocumentLinkToRows(rows: any) {
  for (let i = 0; i < rows.length; i++) {
    const {hyphen_case_title} = rows[i] as any;
    if (!hyphen_case_title) break;

    const link = documentLink(hyphen_case_title);
    const link_verbose = link ? `${link}?verbose=true` : null;
    rows[i] = {
      ...rows[i],
      link,
      link_verbose,
    };
  }

  return rows;
}

export function addSectionLinksToRows(rows: any) {
  for (let i = 0; i < rows.length; i++) {
    if (!rows[i].document_hyphen_case_title) break;

    rows[i] = {
      ...rows[i],
      ...getSectionLinks(rows[i]),
    };
  }

  return rows;
}
