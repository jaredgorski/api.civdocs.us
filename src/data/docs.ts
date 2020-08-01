import db from '../db/db';
import {toHyphenCase} from '../util/string';

export function fetchDocumentEnum(): Promise<Object> {
    let query = 'SELECT title, document_id FROM jgorski_civdocs.documents;';

    type DocEnum = {
        [title: string]: number,
    };

    type DataItem = {
        title: string,
        document_id: number,
    };

    return db.query(query).then(data => data.reduce((obj: DocEnum, curr: DataItem) => {
        const docTitle = toHyphenCase(curr.title);
        obj[docTitle] = curr.document_id;
        return obj;
    }, {}));
}

export function fetchDocumentSectionEnum(documentId: number): Promise<Object> {
    const query = `SELECT title, section_id FROM jgorski_civdocs.sections WHERE document_id = ${documentId};`;

    type SecEnum = {
        [title: string]: number,
    };

    type DataItem = {
        title: string,
        section_id: number,
    };

    return db.query(query).then(data => data.reduce((obj: SecEnum, curr: DataItem) => {
        const secTitle = toHyphenCase(curr.title);
        obj[secTitle] = curr.section_id;
        return obj;
    }, {}));
}

export function fetchDocumentIndex(): Promise<Array<Object>> {
    let query = 'SELECT * FROM jgorski_civdocs.documents;';

    return db.query(query);
}

export function fetchDocumentData(documentId: number, sectionId: number, paragraphIndex: number): Promise<Array<Object>> {
    if (!documentId) throw new Error('No document specified');

    let table = 'documents';

    let queryPredicate = ` WHERE document_id = ${documentId}`;

    if (sectionId) {
        table = 'sections';
        queryPredicate += ` AND section_id = ${sectionId}`;
    }

    if (paragraphIndex) {
        table = 'paragraphs';
        queryPredicate += ` AND paragraph_index = ${paragraphIndex}`;
    }

    const query = `SELECT * FROM jgorski_civdocs.${table}` + queryPredicate + ';';

    return db.query(query);
}

export function fetchDocumentSections(documentId: number): Promise<Array<Object>> {
    if (!documentId) throw new Error('No document specified');

    let query = 'SELECT * FROM jgorski_civdocs.sections';

    query += ` WHERE document_id = ${documentId}`;

    query += ' ORDER BY section_id';

    query += ';';

    return db.query(query);
}

export function fetchDocumentContent(documentId: number, sectionId: number, paragraphIndex: number, limit: number, offset: number): Promise<Array<Object>> {
    if (!documentId) throw new Error('No document specified');

    let query = 'SELECT content FROM jgorski_civdocs.paragraphs';

    query += ` WHERE document_id = ${documentId}`;

    if (sectionId) {
        query += ` AND section_id = ${sectionId}`;
    }

    if (paragraphIndex) {
        query += ` AND paragraph_index = ${paragraphIndex}`;
    } else {
        query += ' ORDER BY paragraph_id';
    }

    if (limit) {
        query += ` LIMIT ${limit}`;
    }

    if (offset) {
        query += ` OFFSET ${offset}`;
    }

    query += ';';

    return db.query(query);
}
