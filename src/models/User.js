const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username:{
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'El password es requerido'],
  }
},{
  timestamps: true,
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;
