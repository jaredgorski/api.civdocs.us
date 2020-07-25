import {toHyphenCase} from '../util/string';

export function fetchDocumentEnum(db: any): Promise<Object> {
    let query = 'SELECT title, document_id FROM jgorski_civdocs.documents;';

    type DocEnum = {
        [title: string]: number,
    };

    type DataItem = {
        title: string,
        document_id: number,
    };

    return dbQuery(db, query).then(data => data.reduce((obj: DocEnum, curr: DataItem) => {
        const docTitle = toHyphenCase(curr.title);
        obj[docTitle] = curr.document_id;
        return obj;
    }, {}));
}

export function fetchDocumentIndex(db: any): Promise<Array<Object>> {
    let query = 'SELECT * FROM jgorski_civdocs.documents;';

    return dbQuery(db, query);
}

export function fetchDocumentData(db: any, document: number, section: number, paragraph: number): Promise<Array<Object>> {
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

    return dbQuery(db, query);
}

export function fetchDocumentSections(db: any, document: number): Promise<Array<Object>> {
    if (!document) throw new Error('No document specified');

    let query = 'SELECT * FROM jgorski_civdocs.sections';

    query += ` WHERE document_id = ${document}`;

    query += ' ORDER BY section_id';

    query += ';';

    return dbQuery(db, query);
}

export function fetchDocumentContent(db: any, document: number, section: number, paragraph: number, limit: number, offset: number): Promise<Array<Object>> {
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

    return dbQuery(db, query);
}

export async function dbQuery(db: any, query: string): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
        db.query(query, (err: any, rows: any) => {
            if (err) reject(err);

            resolve(rows);
        });
    });
}
