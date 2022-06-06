const { Schema, model, Types } = require("mongoose");
const Reaction = require("./Reaction");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      typr: String,
      min: [1, "Please enter your thought"],
    }, 
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: Reaction,
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
