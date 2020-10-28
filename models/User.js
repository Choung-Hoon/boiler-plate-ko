const mongoose = require('mongoose')
/**
 * {
 * name:'nobel',
 * email:'nobel77@daum.net',
 * password:'****',.. 
 * }
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: { // 유효성 관리
    type: String
  },
  tokenExp: {  // token 유효기간
    type: Number
  }
})

const User = mongoose.model('User', userSchema);

module.exports = {User}
