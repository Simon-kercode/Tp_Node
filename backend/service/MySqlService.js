const fs = require("node:fs/promises")
const {getDB} = require('../config/db')

class MySqlService {
    #tableName
    #tableStruct

    constructor(tableName, tableStruct) {
        this.#tableName = tableName
        this.#tableStruct = [...tableStruct]
    }

    async getAll() {
        const db = getDB();
        const [results, fields] = await db.query(
            'SELECT * FROM `' + this.#tableName + '`'
        );
        console.log(results);
        
        return results
    }

    async getById(id) {
        const [results, fields] = await db.query(
            'SELECT * FROM `' + this.#tableName + '` WHERE id=?',
            [id]
        );
        return results[0]
    }

    async update(id, data) {
        const tmpListe = this.#tableStruct.map(col => `${col}='${data[col]}'`)

        const [results, fields] = await db.query(
            'UPDATE `' + this.#tableName + '` SET ' + tmpListe.join(", ") + ' WHERE id=?',
            [id]
        );
    }
    
    async add(data) {
        console.log('data to add :', data);
        const db = getDB();
        const placeholders = this.#tableStruct.map(() => '?').join(', ');
        const values = this.#tableStruct.map(col => data[col]);

        const [results] = await db.query(
            `INSERT INTO \`${this.#tableName}\` (${this.#tableStruct.join(', ')}) VALUES (${placeholders})`,
            values
        );
        return results;
    }

    async delete(id) {
        const [results, fields] = await db.query(
            'DELETE FROM `' + this.#tableName + '` WHERE id=?',
            [id]
        );
        return results
    }

}
module.exports = MySqlService