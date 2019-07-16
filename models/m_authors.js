const db = require("./conn.js");

class Authors {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static async getAllAuthors() {
        try {
            const response = await db.any(`select * from authors;`);
            return response;
        } catch (err) {
            return err.message
        }
    }

    static async getAuthorByID(a_id) {
        try {
            const response = await db.one(`select * from authors where id = ${a_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async removeAuthor(a_id) {
        try {
            const response = await db.result(`delete from authors where id = ${a_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addAuthor(id, name, email) {
        const query = `INSERT INTO authors (id, name, email) VALUES ('${id}', '${name}', '${email}')`;

        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async updateAuthor(id, column, name) {
        const query = `UPDATE authors SET ${column} = '${name}' WHERE id = '${id}'`;

        try {
            let response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

}

module.exports = Authors;