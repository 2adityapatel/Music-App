require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const {checkForAuthenticationCookie} = require("./middlewares/authentication")
const bodyParser = require('body-parser');

const signRoute = require("./routes/sign")
const userRoute = require('./routes/user')
const artistRoute = require('./routes/artist')
const cors = require('cors');

const verifyTokenAndRole = require('./middlewares/authMiddleware')

const app = express()
const PORT = process.env.PORT || 8000;

mongoose.connect("mongodb://127.0.0.1:27017/musicplayer")
.then(()=> console.log("Mongodb Connected"))
.catch((e)=> console.log("Error connecting to db."))

app.use(express.urlencoded({extended : false}))
app.use(cors());
app.use(bodyParser.json());  
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))


app.get("/server",(req,res)=> {
    res.send("Welcome to Music player server")
})

app.use("/", signRoute)
app.use("/user",verifyTokenAndRole("USER") ,userRoute)
app.use("/artist",verifyTokenAndRole("ARTIST"),artistRoute)

app.listen(PORT , () => {
    console.log("Server running at http://localhost:8000");
})