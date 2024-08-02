const db = require("../database/connect")

class Diary {

   constructor({ entry_id, entry_date, entry_time, category, content, title, author_name }) {
      this.entry_id = entry_id;
      this.entry_date = entry_date;
      this.entry_time = entry_time;
      this.category = category;
      this.content = content;
      this.title = title;
      this.author_name = author_name;
    }


    static async getAll() {
        const response = await db.query("SELECT * FROM diary ORDER BY entry_id;")
        if (response.rows.length === 0) {
          throw new Error("No diary posts available.")
        }
    
        return response.rows.map(p => new Diary(p));
      }

    static async getOneById(entry_id) {
        const response = await db.query("SELECT * FROM diary WHERE entry_id = $1;", [entry_id]);

        if (response.rows.length != 1) {
          throw new Error("Unable to locate diary entry.")
        }

        return new Diary(response.rows[0]);
      }

    static async create(data) {
        const { category, content, title, author_name } = data;
        const response = await db.query("INSERT INTO diary (category, content, title, author_name) VALUES ($1, $2, $3, $4) RETURNING *;", [category, content, title, author_name]);
        const diaryId = response.rows[0].entry_id;
        const newDiary = await Diary.getOneById(diaryId);
    
        return newDiary;
      }


     async destroy(data) {
        const response = await db.query("DELETE FROM diary WHERE entry_id = $1 RETURNING *;", [this.entry_id])
        return new Diary(response.rows[0])
     
    }


}

module.exports = Diary;