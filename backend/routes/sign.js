const { Router } = require("express");
const User = require("../models/user");
const UserProfile = require("../models/userprofile")
const ArtistProfile = require("../models/artistprofile")

const router = Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password);
  try {
    const {token,role} = await User.matchPasswordAndGenerateToken(email, password);
    console.log(token);
    return res.cookie("token", token).status(200).send({ msg: "Login successful", token ,role});
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Incorrect Email or Password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").status(200).send({ msg: "Logout successful" });
});

router.post("/signup", async (req, res) => {
  // const { fullName, email, password ,role} = req.body;
  const {  email, password ,role} = req.body;
  console.log(req.email );
  const username = email.split("@")[0]
  try {
    const user = await User.create({
      email,
      password,
      role
    });

    if (role === 'ARTIST'){
      await ArtistProfile.create(
               {email,username : username,profilePhoto:"Hello", genre : "", bio:"",followers:0, instagram:"", twitter:"", facebook:""}
      )                                               
    }else{
       await UserProfile.create({
        email,
        username: username,
        profilePhoto:"Hello",
      })
    }
    console.log(user);
    return res.status(201).send({ msg: "User created successfully", user });
  } catch (error) {
    console.log(error.message + "hiii");
    return res.status(500).send({ msg: "Error creating user", error: error.message });
  }
});

module.exports = router;
