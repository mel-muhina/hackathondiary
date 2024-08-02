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
        const response = await db.query("SELECT * FROM diary ORDER BY entry_id DESC;")
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
        const { category, content, title, author_name} = data;
        const date = '2024-08-02'
        const time = '10:30:00'
        const response = await db.query("INSERT INTO diary (category, content, title, author_name, entry_date, entry_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [category, content, title, author_name, date, time]);

        const diaryId = response.rows[0].entry_id;
        const newDiary = await Diary.getOneById(diaryId);
    
        return newDiary;
      }

      async update(data) {

        const {entry_date, entry_time, category, content, title, author_name} = data;
        console.log("Model updat 1", data);
        console.log("Model updat 2", category, content, title, author_name);
        const oldAuthor_name = this.author_name;
        const existingAuthor_name = await db.query("SELECT author_name FROM diary WHERE LOWER(author_name) = LOWER($1);", [oldAuthor_name]);

        if(existingAuthor_name.rows.length > 0) {
            const updatedAuthor_name = existingAuthor_name.rows[0].author_name    
            let response = await db.query("UPDATE diary SET entry_date = ($1), entry_time = ($2), category = ($3), content = ($4), title = ($5), author_name = ($6), WHERE LOWER(author_name)= LOWER($7) RETURNING *;", [entry_date, entry_time, category, content, title, author_name, updatedAuthor_name]);
         console.log("MODEL UPDATE 5 ", response);
            return new Diary(response.rows[0]);
        } else {
            throw new Error("A diary with this author name already exists");
        }
    }

    //mel


     async destroy(data) {
        const response = await db.query("DELETE FROM diary WHERE entry_id = $1 RETURNING *;", [this.entry_id])
        return new Diary(response.rows[0])
        
     
    }


}

module.exports = Diary;