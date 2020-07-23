import {connect} from '../db/connection';
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

    return dbQuery(query).then(data => data.reduce((obj: DocEnum, curr: DataItem) => {
        const docTitle = toHyphenCase(curr.title);
        obj[docTitle] = curr.document_id;
        return obj;
    }, {}));
}

export function fetchDocumentIndex(): Promise<Array<Object>> {
    let query = 'SELECT * FROM jgorski_civdocs.documents;';

    return dbQuery(query);
}

export function fetchDocumentData(document: number, section: number, paragraph: number): Promise<Array<Object>> {
    if (!document) throw new Error('No document specified');

    let table = 'documents';

    let queryPredicate = ` WHERE document_id = ${document}`;

    if (section) {
        table = 'sections';
        queryPredicate += ` AND section_index = ${section}`;
    }

    if (paragraph) {
        table = 'paragraphs';
        queryPredicate += ` AND paragraph_index = ${paragraph}`;
    }

    const query = `SELECT * FROM jgorski_civdocs.${table}` + queryPredicate + ';';

    return dbQuery(query);
}

export function fetchDocumentSections(document: number): Promise<Array<Object>> {
    if (!document) throw new Error('No document specified');

    let query = 'SELECT * FROM jgorski_civdocs.sections';

    query += ` WHERE document_id = ${document}`;

    query += ' ORDER BY section_id';

    query += ';';

    return dbQuery(query);
}

export function fetchDocumentContent(document: number, section: number, paragraph: number, limit: number, offset: number): Promise<Array<Object>> {
    if (!document) throw new Error('No document specified');

    let query = 'SELECT content FROM jgorski_civdocs.paragraphs';

    query += ` WHERE document_id = ${document}`;

    if (section) {
        query += ` AND section_index = ${section}`;
    }

    if (paragraph) {
        query += ` AND paragraph_index = ${paragraph}`;
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

    return dbQuery(query);
}

export function dbQuery(query: string): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
        const connection = connect();

        connection.query(query, (err, rows) => {
            if (err) reject(err);

            resolve(rows);
        });

        connection.end();
    });
}
