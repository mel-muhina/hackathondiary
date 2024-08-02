const express = require('express');
const cors = require("cors")

const logger = require("./middleware/logger")

const diaryRouter = require('./routers/diary');


const api = express()

api.use(express.json());
api.use(cors())
api.use(logger)

api.use("/", diaryRouter)

api.get("/", (req, res) => {
  res.status(200).json({
    title: "Diary Placeholder",
    description: "Write all your secrets and stuff!"
  })
})



module.exports = api;
