require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const User = require('./models/user')
const {checkForAuthenticationCookie} = require("./middlewares/authentication")

const signRoute = require("./routes/sign")
const userRoute = require('./routes/user')
const artistRoute = require('./routes/artist')
const cors = require('cors');

const verifyTokenAndRole = require('./middlewares/authMiddleware')

const app = express()
const PORT = process.env.PORT || 8000;
const pass = process.env.PASS
const username = process.env.USERNAME1

mongoose.connect("mongodb://127.0.0.1:27017/musicplayer")
.then(()=> console.log("Mongodb Connected"))
.catch((e)=> console.log("Error connecting to db."))


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${username}:${pass}@cluster0.do6uw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     const database = client.db('musicplayer'); 
//     // const collection = database.collection(User); 

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



app.use(express.json());  
app.use(express.urlencoded({extended : true}))
app.use(cors());
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