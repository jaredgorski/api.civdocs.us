"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const package_json_1 = require("../../package.json");
exports.index = (req, res) => {
    res.json({ author: package_json_1.author, homepage: package_json_1.homepage, version: package_json_1.version });
};
//# sourceMappingURL=home.js.map