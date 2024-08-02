const express = require('express');
const cors = require("cors")

const logger = require("./logger")

const diaryRouter = require('./routers/diary');


const app = express()

app.use(express.json());
app.use(cors())
app.use(logger)

app.use("/", diaryRouter)

app.get("/", (req, res) => {
  res.status(200).json({
    title: "Diary Placeholder",
    description: "Write all your secrets and stuff!"
  })
})



module.exports = api;
