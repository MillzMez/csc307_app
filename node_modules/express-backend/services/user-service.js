import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);

/*mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));
*/
function getUsers(name, job) {
  if (!name && !job) {
    return userModel.find();
  } else if (name && job) {
    // ✅ ADDED: BOTH filters
    return userModel.find({ name: name, job: job });
  } else if (name) {
    return userModel.find({ name: name });
  } else if (job) {
    return userModel.find({ job: job });
  }
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};