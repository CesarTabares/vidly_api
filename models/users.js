const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  ); //dont store secret keys in code
  return token;
};

const User = mongoose.model("users", userSchema);

const validateUser = (rental) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(rental);
};

exports.User = User;
exports.validate = validateUser;
