const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { getUser, setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name: name,
    email: email,
    password: password,
  });
  res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user)
    return res.render("login", {
      error: "invalid username or password",
    });

  sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin };
