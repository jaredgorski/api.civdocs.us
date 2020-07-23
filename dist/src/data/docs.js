"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = exports.fetchDocumentContent = exports.fetchDocumentSections = exports.fetchDocumentData = exports.fetchDocumentIndex = exports.DOCUMENTS = void 0;
const connection_1 = require("../db/connection");
exports.DOCUMENTS = {
    'the-federalist': 1,
};
function fetchDocumentIndex() {
    let query = 'SELECT * FROM jgorski_civdocs.documents;';
    return dbQuery(query);
}
exports.fetchDocumentIndex = fetchDocumentIndex;
function fetchDocumentData(document, section, paragraph) {
    if (!document)
        throw new Error('No document specified');
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
exports.fetchDocumentData = fetchDocumentData;
function fetchDocumentSections(document) {
    if (!document)
        throw new Error('No document specified');
    let query = 'SELECT * FROM jgorski_civdocs.sections';
    query += ` WHERE document_id = ${document}`;
    query += ' ORDER BY section_id';
    query += ';';
    return dbQuery(query);
}
exports.fetchDocumentSections = fetchDocumentSections;
function fetchDocumentContent(document, section, paragraph, limit, offset) {
    if (!document)
        throw new Error('No document specified');
    let query = 'SELECT content FROM jgorski_civdocs.paragraphs';
    query += ` WHERE document_id = ${document}`;
    if (section) {
        query += ` AND section_index = ${section}`;
    }
    if (paragraph) {
        query += ` AND paragraph_index = ${paragraph}`;
    }
    else {
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
exports.fetchDocumentContent = fetchDocumentContent;
function dbQuery(query) {
    return new Promise((resolve, reject) => {
        const connection = connection_1.connect();
        connection.query(query, (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
        connection.end();
    });
}
exports.dbQuery = dbQuery;
//# sourceMappingURL=docs.js.map