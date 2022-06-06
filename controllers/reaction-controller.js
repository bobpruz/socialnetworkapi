const { Reaction, Thought } = require("../models");

const reactionController = {
  // get all reactions
  getAllReactions(req, res) {
    Reaction.find({})
      .populate.select("-__v")
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getReactionById({ params }, res) {
    Reaction.findOne({ _id: params.id })
      .select("-__v")
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: "No reaction found with this id!" });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add reaction to thought
  addReaction({ params, body }, res) {
    console.log(body);
    Reaction.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.id },
          { $push: { reactions: _id } },
          { new: true }
        );
      })
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => res.json(err));
  },
  // remove reaction
  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res.status(404).json({ message: "No reaction with this id!" });
        }
        return Reaction.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = reactionController;
