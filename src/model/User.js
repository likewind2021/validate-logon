/* eslint-disable quote-props */
const mongoose = require('../config/DBHelper')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  'username': { type: String },
  'nickname': { type: String },
  'password': { type: String },
  'created': { type: String }
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
