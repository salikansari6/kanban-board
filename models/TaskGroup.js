const mongoose = require("mongoose");
const Task = require("./Task").schema;
const Schema = mongoose.Schema;

const taskGroupSchema = new Schema({
  title: String,
  columnColor: String,
  items: [Task],
});

module.exports = mongoose.model("TaskGroup", taskGroupSchema);
