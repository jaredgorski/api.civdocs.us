import mysql, {Connection} from 'mysql';
import {readonly} from './credentials.json'

let connection: Connection;

const client = () => {
  if (!connection) {
    connection = mysql.createConnection({
      host: "ricky.heliohost.org",
      user: readonly.user,
      password: readonly.password,
      database: 'jgorski_civdocs',
    });

    connection.connect((err: any) => {
      if (err) throw err;
    });
  }

  return connection;
}

async function query(query: string): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
        client().query(query, (err: any, rows: any) => {
            if (err) reject(err);

            resolve(rows);
        });
    });
}

const db = {
  client,
  query,
};

export default db;
