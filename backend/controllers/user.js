
async function handleSignIn() {

    const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
    
}

async function handleSignUp() {

    const {fullName , email , password } = req.body;

    await User.create({
        fullName,
        email,
        password,
      });
      return res.redirect("/");
    
}

module.exports = {
    handleSignIn,
    handleSignUp
}