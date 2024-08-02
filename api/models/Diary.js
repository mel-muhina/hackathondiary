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

        const {category, content, title} = data;
        const oldId = req.params.id
        console.log("Model update 1", data);
        console.log("Model update 2", category, content, title);
        const oldContent = this.content;
        console.log("Model update 3");
        const checkId = await db.query("SELECT entry_id FROM diary WHERE entry_id = ($1);", [oldId]);
        console.log("Model update 4");
        if(checkId.rows.length > 0) {
            const updatePost = checkId.rows[0]  
            let response = await db.query("UPDATE diary SET category = ($1), content = ($2), title = ($3), WHERE entry_id = $4 RETURNING *;", [category, content, title, oldId]);
         console.log("MODEL UPDATE 5 ", response);
            return new Diary(response.rows[0]);
        } else {
            throw new Error("A diary with this author name already exists");
        }
    }

   
     async destroy(data) {
        const response = await db.query("DELETE FROM diary WHERE entry_id = $1 RETURNING *;", [this.entry_id])
        return new Diary(response.rows[0])
        
     
    }


}

module.exports = Diary;