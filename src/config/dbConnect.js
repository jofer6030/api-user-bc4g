const mongoose = require('mongoose')

const dbConnect = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB mongo conectado exitosamente")
  } catch (error) {
    console.log(error)
  }
}

module.exports = dbConnect