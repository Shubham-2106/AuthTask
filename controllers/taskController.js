const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};


exports.createTask = async (req, res) => {
  console.log('Create Task Body:', req.body);
  const completed = req.body.completed === true || req.body.completed === 'true';
  let task = new Task({
    title: req.body.title,
    completed,
    user: req.user._id
  });
  await task.save();
  console.log('Saved Task:', task);
  res.status(201).json(task);
};


exports.updateTask = async (req, res) => {
  console.log('Update Task Body:', req.body);
  const completed = req.body.completed === true || req.body.completed === 'true';
  let task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (task) {
    task.title = req.body.title;
    task.completed = completed;
    await task.save();
    console.log('Updated Task:', task);
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};


exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Task deleted' });
};
