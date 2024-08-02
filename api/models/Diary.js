const db = require("../database/connect")

class Diary {

    constructor({ id, postName, postDescription, postAuthor, postDate, authorId }) {
      this.id = id;
      this.postName = postName;
      this.postDescription = postDescription;
      this.postAuthor = postAuthor;
      this.postDate = postDate;
      this.authorId = authorId;
    }


    static async getAll() {
        const response = await db.query("SELECT * FROM diary ORDER BY date;")
        if (response.rows.length === 0) {
          throw new Error("No diary posts available.")
        }
    
        return response.rows.map(p => new Diary(p));
      }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM diary WHERE id = $1;", [id]);

        if (response.rows.length != 1) {
          throw new Error("Unable to locate diary entry.")
        }

        return new Diary(response.rows[0]);
      }

}