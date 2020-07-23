"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mysql_1 = __importDefault(require("mysql"));
const credentials_json_1 = require("./credentials.json");
function connect() {
    const connection = mysql_1.default.createConnection({
        host: "ricky.heliohost.org",
        user: credentials_json_1.readonly.user,
        password: credentials_json_1.readonly.password,
        database: 'jgorski_civdocs',
    });
    connection.connect(err => {
        if (err)
            throw err;
    });
    return connection;
}
exports.connect = connect;
//# sourceMappingURL=connection.js.map