const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "Please enter a username",
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
      required: "Please enter an email address",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: Thought,
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
