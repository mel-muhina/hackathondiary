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

    static async create(data) {
        const { postName, postDescription } = data;
        const response = await db.query("INSERT INTO diary (postName, postDescription) VALUES ($1, $2) RETURNING *;", [postName, postDescription]);
        const diaryId = response.rows[0].id;
        const newDiary = await Diary.getOneById(diaryId);
    
        return newDiary;
      }

     async destroy(data) {
        const response = await db.query("DELETE FROM diary WHERE id = $1 RETURNING *;", [this.id])
        return new Diary(response.rows[0])
     
    }


}

module.exports = Diary;