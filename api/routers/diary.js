const { Router } = require('express');

const diaryController = require('../controllers/diary');
const diaryRouter = Router();


diaryRouter.get("/diary", diaryController.index);
// diaryRouter.get("/diary/top", diaryController.getTop);
diaryRouter.get("/diary/:id", diaryController.show);
diaryRouter.patch("/diary/:id", diaryController.update);
diaryRouter.post("/diary", diaryController.create);
diaryRouter.delete("/diary/:id", diaryController.destroy);

module.exports = diaryRouter;
