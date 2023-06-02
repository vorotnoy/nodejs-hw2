const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helper");

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: ''
}
}, { versionKey: false, timestamps: false },);

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = { User,  };
