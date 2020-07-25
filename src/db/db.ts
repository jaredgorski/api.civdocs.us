import mysql from 'mysql';
import {readonly} from './credentials.json'

const connection = mysql.createConnection({
  host: "ricky.heliohost.org",
  user: readonly.user,
  password: readonly.password,
  database: 'jgorski_civdocs',
});

connection.connect(err => {
  if (err) throw err;
});

export default connection;
