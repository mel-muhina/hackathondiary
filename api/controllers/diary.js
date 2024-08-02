const Diary = require("../models/Diary");


async function index(req, res) {
  try {
    const diary = await Diary.getAll();
    res.status(200).json(diary);
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const diary = await Diary.getOneById(id);
    res.status(200).json(diary);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function create(req, res) {
  try {
    console.log("Controller create 1")

      const data = req.body
      const newPost = await Diary.create(data)
      res.status(201).json(newPost)

  } catch(err) {
      res.status(400).json({ error: err.message })
  }
}

async function update(req, res) {
  try {
      const id = parseInt(req.params.id);
      const newContent =  req.body;

      const diary = await Diary.getOneById(id);
      console.log("controller 3", diary)
      
      console.log("Controller 4", newContent)
      if(diary) {
         console.log("Controller 5," , newContent)
          const updateContent = await diary.update(newContent);
          console.log("Controller 6")
          res.status(200).json(updateContent);
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  
  }
  //console.log("controller update 4");  
};

async function destroy(req, res) {
  try {
     const id = parseInt(req.params.id);
     const diary = await Diary.getOneById(id);
     const result = await diary.destroy()
     res.sendStatus(204)

  } catch(err) {
      res.status(404).json({ error: err.message })
  }
}


module.exports = {
    index, show, create, update, destroy
}