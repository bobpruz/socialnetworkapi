const router = require("express").Router();

// import controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

//  user "/" routes
router.route("/").get(getAllUsers).post(createUser);

// "/user/:id" routes
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// friends route
router.route("/:userId/friends/:friendId").put(addFriend);

module.exports = router;
