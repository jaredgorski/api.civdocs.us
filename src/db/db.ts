import mysql, {Connection, MysqlError, OkPacket} from 'mysql';
import {readonly} from './credentials.json'

let connection: Connection;

const client = () => {
  if (!connection) {
    connection = mysql.createConnection({
      host: 'ricky.heliohost.org',
      user: readonly.user,
      password: readonly.password,
      database: 'jgorski_civdocs',
    });

    connection.connect((err: MysqlError) => {
      if (err) throw err;
    });
  }

  return connection;
}

async function query(query: string): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
        client().query(query, (err: MysqlError, rows: OkPacket[]) => {
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
