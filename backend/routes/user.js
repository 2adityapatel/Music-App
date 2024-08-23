const { Router } = require("express");
const User = require("../models/user");

const router = Router();


router.get('/', (req,res) => {
    res.json({ message: 'Welcome to the user page!', user: req.user })
})

module.exports = router