"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocument = exports.index = void 0;
const docs_1 = require("../data/docs");
exports.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield docs_1.fetchDocumentIndex();
    res.json(result);
});
exports.getDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = {};
    try {
        const { document, section, paragraph } = req.params;
        const { verbose, limit, offset } = req.query;
        const sanitized = {
            document: docs_1.DOCUMENTS[document],
            section: parseInt(section, 10),
            paragraph: parseInt(paragraph, 10),
            verbose: verbose === 'true',
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
        };
        const dbContent = yield docs_1.fetchDocumentContent(sanitized.document, sanitized.section, sanitized.paragraph, sanitized.limit, sanitized.offset);
        const content = dbContent.map((c) => c.content);
        if (sanitized.verbose) {
            const docData = yield docs_1.fetchDocumentData(sanitized.document, sanitized.section, sanitized.paragraph);
            let data = docData[0] || {};
            if (!sanitized.section) {
                const docSections = yield docs_1.fetchDocumentSections(sanitized.document);
                data = Object.assign(Object.assign({}, data), { sections: docSections });
            }
            result = Object.assign(Object.assign({}, data), { content });
        }
        else {
            result = content;
        }
    }
    catch (error) {
        result = { error };
    }
    res.json(result);
});
//# sourceMappingURL=docs.js.map