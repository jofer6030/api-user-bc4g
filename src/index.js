const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const dbConnect = require('./config/dbConnect');
dbConnect();
const userRoutes = require('./routes/user.routes')

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/users',userRoutes)


app.listen(port, () => {
  console.log("El servidor is running on port:",port)
})