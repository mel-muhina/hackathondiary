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

}