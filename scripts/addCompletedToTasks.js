const mongoose = require('mongoose');
const Task = require('../models/Task');
require('dotenv').config();

async function addCompletedField() {
  await mongoose.connect(process.env.MONGO_URI);
  const result = await Task.updateMany(
    { completed: { $exists: false } },
    { $set: { completed: false } }
  );
  console.log(`Updated ${result.modifiedCount || result.nModified} tasks.`);
  await mongoose.disconnect();
}

addCompletedField().catch(console.error);
