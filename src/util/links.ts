const apiHost = process.env.API_HOST;
const linkBase = {
  docs: `${apiHost}/docs`,
};

export const documentIndexLink = () => linkBase.docs;

export const documentLink = (hyphen_case_title: string) =>
  `${documentIndexLink()}/${encodeURIComponent(hyphen_case_title)}`;

export const sectionLink = (document_hyphen_case_title: string, hyphen_case_title: string) =>
  hyphen_case_title ? `${documentLink(document_hyphen_case_title)}/${encodeURIComponent(hyphen_case_title)}` : null;

export const paragraphLink = (document_hyphen_case_title: string, hyphen_case_title: string, paragraph_index: number) =>
  hyphen_case_title && paragraph_index ? `${documentLink(document_hyphen_case_title)}/${encodeURIComponent(hyphen_case_title)}/${encodeURIComponent(paragraph_index)}` : null;

export const verboseLink = (link: string) => `${link}?verbose=true`;

export const getSectionLinks = (section: any) => {
  const {document_hyphen_case_title, hyphen_case_title, prev_section_hyphen_case_title, next_section_hyphen_case_title} = section;

  const link = sectionLink(document_hyphen_case_title, hyphen_case_title);
  const link_verbose = link ? `${link}?verbose=true` : null;
  const prev_section_link = sectionLink(document_hyphen_case_title, prev_section_hyphen_case_title);
  const next_section_link = sectionLink(document_hyphen_case_title, next_section_hyphen_case_title);
  const prev_section_link_verbose = prev_section_link ? verboseLink(prev_section_link) : null;
  const next_section_link_verbose = next_section_link ? verboseLink(next_section_link) : null;

  return {
    link,
    link_verbose,
    prev_section_link,
    next_section_link,
    prev_section_link_verbose,
    next_section_link_verbose,
  };
};

export const getParagraphLinks = (paragraph: any) => {
  const {document_hyphen_case_title, hyphen_case_title, paragraph_index, prev_paragraph_index, next_paragraph_index} = paragraph;

  const link = paragraphLink(document_hyphen_case_title, hyphen_case_title, paragraph_index);
  const link_verbose = link ? `${link}?verbose=true` : null;
  const prev_paragraph_link = paragraphLink(document_hyphen_case_title, hyphen_case_title, prev_paragraph_index);
  const next_paragraph_link = paragraphLink(document_hyphen_case_title, hyphen_case_title, next_paragraph_index);
  const prev_paragraph_link_verbose = prev_paragraph_link ? verboseLink(prev_paragraph_link) : null;
  const next_paragraph_link_verbose = next_paragraph_link ? verboseLink(next_paragraph_link) : null;

  return {
    link,
    link_verbose,
    prev_paragraph_link,
    next_paragraph_link,
    prev_paragraph_link_verbose,
    next_paragraph_link_verbose,
  };
};
