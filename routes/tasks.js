const TaskCollection = require("../models/TaskCollection");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = require("express").Router();

router.get("/", isAuthenticated, async (req, res) => {
  const result = await TaskCollection.find({ userId: req.user._id });
  res.send(result);
});

router.delete("/deleteCard", isAuthenticated, async (req, res) => {
  const taskCollection = await TaskCollection.findOne({
    userId: req.user._id,
  });
  taskCollection.tasks[req.body.columnIndex].items = taskCollection.tasks[
    req.body.columnIndex
  ].items.filter((i) => i.id !== req.body.cardId);
  await taskCollection.save();
  res.json({ success: true });
});

router.put("/updateCard", isAuthenticated, async (req, res) => {
  const { updatedValues, columnIndex, id } = req.body;

  const taskCollection = await TaskCollection.findOne({
    userId: req.user._id,
  });

  taskCollection.tasks[columnIndex].items = taskCollection.tasks[
    columnIndex
  ].items.map((t) => {
    if (t.id !== id) {
      return t;
    } else {
      return {
        ...t.toObject(),
        ...updatedValues,
      };
    }
  });

  await taskCollection.save();
  res.json({ success: true });
});

router.post("/add", isAuthenticated, async (req, res) => {
  const taskCollection = await TaskCollection.findOne({
    userId: req.user._id,
  });
  taskCollection.tasks[req.body.columnIndex].items.unshift(req.body.card);
  const newCollection = await taskCollection.save();
  res.json(newCollection);
});

router.put("/moveItem", isAuthenticated, async (req, res) => {
  const taskCollection = await TaskCollection.findOne({
    userId: req.user._id,
  });
  taskCollection.tasks[req.body.toColumnIndex].items.splice(
    req.body.hoveredOverIndex,
    0,
    taskCollection.tasks[req.body.fromColumnIndex].items.splice(
      req.body.draggedOverIndex,
      1
    )[0]
  );
  await taskCollection.save();
  res.json({ success: true });
});

router.put("/moveColumn", isAuthenticated, async (req, res) => {
  const taskCollection = await TaskCollection.findOne({
    userId: req.user._id,
  });
  taskCollection.tasks[req.body.toColumnIndex].items.splice(
    taskCollection.tasks[req.body.toColumnIndex].items.length,
    0,
    taskCollection.tasks[req.body.fromColumnIndex].items.splice(
      req.body.card.index,
      1
    )[0]
  );
  await taskCollection.save();
  res.json({ success: true });
});

router.post("/addColumn", isAuthenticated, async (req, res) => {
  const taskCollection = await TaskCollection.findOne({
    userId: req.user._id,
  });
  taskCollection.tasks.push(req.body.newColumn);
  await taskCollection.save();
});

module.exports = router;
