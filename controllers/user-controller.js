const res = require("express/lib/response");
const { user, User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    user
      .find({})
      // get users thoughts
      .populate({
        path: "api/thoughts",
        select: "-_v",
      })
      //   get users friends
      .populate({
        path: "api/users/friends",
        select: "-_v",
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  //   get one user
  getUserById({ params }, res) {
    // return one user
    User.findOne({ _id: params.id })
      // get user thoughts
      .populate({
        path: "api/thoughts",
        select: "-__v",
      })
      //   get users friends
      .populate({
        path: "api/users/friends",
        select: "-_v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
  //   edit a user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //   add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      //  find user to add friend
      { _id: params.userId },
      // $push adds friend to array
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  //   delete user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //   remove friend
  deleteFriend({ params }, res) {
    // find user to remove friend
    User.findOneAndUpdate(
      { _id: params.userId },
      // remove friend from array
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
