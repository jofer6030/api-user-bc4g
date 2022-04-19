const bcrypt = require('bcryptjs');

const User = require('../models/User')

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body

    const user = await User.findOne({email}) // Busca un usuario por email
    if(user) {
      return res.status(400).json({msg: 'Ese correo ya esta en uso'})
    }

    if(password !== confirm_password) {
      return res.status(400).json({msg: 'Las contraseñas no coinciden'})
    }

    const newUser = new User({username,email,password})

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password,salt); // encripta la contraseña

    await newUser.save();

    res.status(200).json({
      msg: 'Usuario registrado exitosamente',
      user: newUser
    })
  } catch (error) {
    const mensaje = error.message.split(":")
    res.status(400).json({
      msg: mensaje[mensaje.length - 1].trim()
    })
  }
}

const loginUser = async (req, res) => {
  const {email,password} = req.body

  const user = await User.findOne({ email })
  if(!user) {
    return res.status(403).json({msg: 'El usuario no existe'})
  }

  const validarPassword = bcrypt.compareSync(password,user.password) // true o false

  if(!validarPassword) {
    return res.status(403).json({msg: 'La contraseña es incorrecta'})
  }

  res.status(200).json({
    msg: 'Usuario logueado exitosamente',
    user
  })

}

module.exports = {
  registerUser,
  loginUser
}