const fs = require("node:fs/promises")
const mysql = require('mysql2/promise')

class MySqlService {
    #host
    #port
    #username
    #pwd
    #db
    #tableName
    #con
    #tableStruct

    constructor(host, port, username, pwd, db, tableName, tableStruct) {
        this.#host = host
        this.#port = port
        this.#username = username
        this.#pwd = pwd
        this.#db = db
        this.#tableName = tableName
        this.#tableStruct = [...tableStruct]
        this.init()
    }

    async init() {
        this.#con = await mysql.createConnection({
            host: this.#host,
            user: this.#username,
            database: this.#db,
            port: this.#port,
            password: this.#pwd
        });
    }

    async getAll() {
        const [results, fields] = await this.#con.query(
            'SELECT * FROM `' + this.#tableName + '`'
        );
        return results
    }

    async getById(id) {
        const [results, fields] = await this.#con.query(
            'SELECT * FROM `' + this.#tableName + '` WHERE id=?',
            [id]
        );
        return results[0]
    }

    async update(id, data) {
        const tmpListe = this.#tableStruct.map(col => `${col}='${data[col]}'`)

        const [results, fields] = await this.#con.query(
            'UPDATE `' + this.#tableName + '` SET ' + tmpListe.join(", ") + ' WHERE id=?',
            [id]
        );
    }
    
    async add(data) {
        console.log(data);

        const tmpListe = this.#tableStruct.map(col => `'${data[col]}'`)

        const [results, fields] = await this.#con.query(
            'INSERT INTO `' + this.#tableName + '` (' + this.#tableStruct.join(', ') + ') VALUES(' + tmpListe.join(", ") + ')'
        );
    }

    async delete(id) {
        const [results, fields] = await this.#con.query(
            'DELETE FROM `' + this.#tableName + '` WHERE id=?',
            [id]
        );
        return results
    }

}
module.exports = MySqlService