import * as App from "./components/app";
import {Result} from "./translation";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./translations.db');

const currentTable = "response";

export function createTable(): Promise<{}> {
    return new Promise((resolve, reject) => {
        const sql = `CREATE TABLE IF NOT EXISTS ${currentTable} (source, target, query, result)`;

        db.run(sql, [], (err: any) => {
            if (err) {
                reject(err.message);
            }
            console.log(`Table created: ${currentTable}`);
            resolve();
        })
    })
}

export function storeTranslation(state: App.State): Promise<{}> {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO ${currentTable}(source, target, query, result) VALUES(?, ?, ?, ?)`;
        const args = [state.source, state.target, state.query, state.result].map(v => JSON.stringify(v));

        db.run(sql, args, (err: any) => {
            if (err) {
                reject(err.message);
            }
            console.log(`Row was added to the table: ${currentTable}`);
            resolve()
        })
    })
}

export function findTranslation(state: App.State): Promise<Result> {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${currentTable} WHERE source = ? AND target = ? AND query = ?`;
        const args = [state.source, state.target, state.query].map(v => JSON.stringify(v));

        db.get(sql, args, (err: any, row: any) => {
            if (err) {
                reject(err.message);
            }
            resolve(row && JSON.parse(row.result))
        });
    })
}

export function closeDb() {
    db.close();
}
