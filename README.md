<div align="center">
  <h1>
    🇺🇸 api.civdocs.us
  </h1>
</div>

<div align="center">
  An open API for the founding documents of the United States of America.
</div>

# Overview

This JSON API exposes a database containing documents relevant to the founding of the United States of America. The goal of this API is to empower developers to include this content in their own work, thereby contributing to a general increase in historical knowledge and civic awareness.

---

# Table of Contents

* [Documents](#documents)
    * [List documents](#list-documents)
    * [Get document](#get-document)
    * [Get document section](#get-document-section)
    * [Get document paragraph](#get-document-paragraph)
* [Repo links](#repo-links)

---

## Documents

### List documents

```
http GET /docs
```

##### Request

```bash
curl "http://api.civdocs.us/docs"
```

##### Response `200 OK`

```js
{
  [
    {
      "document_id": 1,
      "title": "The Federalist",
      "description": "A collection of 85 essays written by Alexander Hamilton, John Jay, and James Madison arguing in favor of ratifying the proposed Constitution of the United States of America.",
      "author": "Alexander Hamilton, John Jay, and James Madison",
      "date": "October 1787 - May 1788",
      "source": "https://guides.loc.gov/federalist-papers/full-text",
      "citation": "\"Federalist Papers: Primary Documents in American History: Full Text of The Federalist Papers.\" Library of Congress Research Guides, Library of Congress, guides.loc.gov/federalist-papers/full-text.",
      "sections_total": 85,
      "hyphen_case_title": "the-federalist",
      "link": "http://api.civdocs.us/docs/the-federalist",
      "link_verbose": "http://api.civdocs.us/docs/the-federalist?verbose=true"
    },
    ...
  ]
}
```

### Get document

```
http GET /docs/:document
```

_NOTE: The :document param is the document `title` in hyphen-case_

##### Parameters

| Name          | Type    | Required      |
| ------------- | ------- | ------------- |
| limit         | number  |               |
| offset        | number  |               |
| verbose       | boolean |               |

_NOTE: If `verbose=true`, the pagination parameters apply to the `content` of the response_

##### Request

```bash
curl "http://api.civdocs.us/docs/the-federalist?limit=1&verbose=true"
```

##### Response `200 OK`

```js
{
  "document_id": 1,
  "title": "The Federalist",
  "description": "A collection of 85 essays written by Alexander Hamilton, John Jay, and James Madison arguing in favor of ratifying the proposed Constitution of the United States of America.",
  "author": "Alexander Hamilton, John Jay, and James Madison",
  "date": "October 1787 - May 1788",
  "source": "https://guides.loc.gov/federalist-papers/full-text",
  "citation": "\"Federalist Papers: Primary Documents in American History: Full Text of The Federalist Papers.\" Library of Congress Research Guides, Library of Congress, guides.loc.gov/federalist-papers/full-text.",
  "sections_total": 85,
  "hyphen_case_title": "the-federalist",
  "sections": [
    {
      "author": "Alexander Hamilton",
      "date": null,
      "document_id": 1,
      "section_id": 1,
      "next_section_id": 2,
      "prev_section_id": null,
      "section_index": 1,
      "next_section_index": 2,
      "prev_section_index": null,
      "paragraphs_total": 12,
      "subtitle": "General Introduction",
      "title": "Federalist No. 1",
      "sections_total": 85
    },
    ...
  ],
  "content": [
    "To the People of the State of New York:"
  ]
}
```

### Get document section

```
http GET /docs/:document/:section
```

_NOTE: The :section param is the section `title` in hyphen-case_

##### Parameters

| Name          | Type    | Required      |
| ------------- | ------- | ------------- |
| limit         | number  |               |
| offset        | number  |               |
| verbose       | boolean |               |

_NOTE: If `verbose=true`, the pagination parameters apply to the `content` of the response_

##### Request

```bash
curl "http://api.civdocs.us/docs/the-federalist/federalist-no.-1?limit=2&verbose=true"
```

##### Response `200 OK`

```js
{
  "document_title": "The Federalist",
  "document_id": 1,
  "title": "Federalist No. 1",
  "subtitle": "General Introduction",
  "author": "Alexander Hamilton",
  "date": null,
  "section_id": 1,
  "prev_section_id": null,
  "next_section_id": 2,
  "section_index": 1,
  "prev_section_index": null,
  "next_section_index": 2,
  "is_last_section": 0,
  "sections_total": 85,
  "paragraphs_total": 12,
  "hyphen_case_title": "federalist-no. 1",
  "document_hyphen_case_title": "the-federalist",
  "link": "http://api.civdocs.us/docs/the-federalist/federalist-no.-1",
  "link_verbose": "http://api.civdocs.us/docs/the-federalist/federalist-no.-1?verbose=true",
  "prev_section_link": null,
  "next_section_link": "http://api.civdocs.us/docs/the-federalist/federalist-no.-2",
  "prev_section_link_verbose": null,
  "next_section_link_verbose": "http://api.civdocs.us/docs/the-federalist/federalist-no.-2?verbose=true",
  "content": [
    "To the People of the State of New York:",
    "AFTER an unequivocal experience of the inefficiency of the subsisting federal government, you are called upon to deliberate on a new Constitution for the United States of America. The subject speaks its own importance; comprehending in its consequences nothing less than the existence of the UNION, the safety and welfare of the parts of which it is composed, the fate of an empire in many respects the most interesting in the world. It has been frequently remarked that it seems to have been reserved to the people of this country, by their conduct and example, to decide the important question, whether societies of men are really capable or not of establishing good government from reflection and choice, or whether they are forever destined to depend for their political constitutions on accident and force. If there be any truth in the remark, the crisis at which we are arrived may with propriety be regarded as the era in which that decision is to be made; and a wrong election of the part we shall act may, in this view, deserve to be considered as the general misfortune of mankind."
  ]
}
```

### Get document paragraph

```
http GET /docs/:document/:section/:paragraph
```

_NOTE: The :paragraph param is the `paragraph_index` of the paragraph being requested_

##### Parameters

| Name          | Type    | Required      |
| ------------- | ------- | ------------- |
| verbose       | boolean |               |

##### Request

```bash
curl "http://api.civdocs.us/docs/the-federalist/federalist-no.-1/3?verbose=true"
```

##### Response `200 OK`

```js
{
  "document_title": "The Federalist",
  "document_id": 1,
  "title": "Federalist No. 1",
  "subtitle": "General Introduction",
  "author": "Alexander Hamilton, John Jay, and James Madison",
  "date": "October 1787 - May 1788",
  "section_id": 1,
  "section_index": 1,
  "paragraph_id": 3,
  "prev_paragraph_id": 2,
  "next_paragraph_id": 4,
  "paragraph_index": 3,
  "prev_paragraph_index": 2,
  "next_paragraph_index": 4,
  "is_last_paragraph": 0,
  "paragraphs_total": 12,
  "content": [
    "This idea will add the inducements of philanthropy to those of patriotism, to heighten the solicitude which all considerate and good men must feel for the event. Happy will it be if our choice should be directed by a judicious estimate of our true interests, unperplexed and unbiased by considerations not connected with the public good. But this is a thing more ardently to be wished than seriously to be expected. The plan offered to our deliberations affects too many particular interests, innovates upon too many local institutions, not to involve in its discussion a variety of objects foreign to its merits, and of views, passions and prejudices little favorable to the discovery of truth."
  ],
  "hyphen_case_title": "federalist-no. 1",
  "document_hyphen_case_title": "the-federalist",
  "link": "http://api.civdocs.us/docs/the-federalist/1/3",
  "link_verbose": "http://api.civdocs.us/docs/the-federalist/1/3?verbose=true",
  "prev_paragraph_link": "http://api.civdocs.us/docs/the-federalist/federalist-no.-1/2",
  "next_paragraph_link": "http://api.civdocs.us/docs/the-federalist/federalist-no.-1/4",
  "prev_paragraph_link_verbose": "http://api.civdocs.us/docs/the-federalist/federalist-no.-1/2?verbose=true",
  "next_paragraph_link_verbose": "http://api.civdocs.us/docs/the-federalist/federalist-no.-1/4?verbose=true"
}
```

## Repo links
- [civdocs.us](https://github.com/jaredgorski/civdocs.us)
- [data.civdocs.us](https://github.com/jaredgorski/data.civdocs.us)
