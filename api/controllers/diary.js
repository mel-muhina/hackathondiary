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


module.exports = {
    index, show
}