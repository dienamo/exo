const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails); // `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (thats why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
    });

    newUser
      .save()
      .then(() => {
        req.login(newUser, (err) => {
          if (err) {
            res.status(500).json({ message: "Login after signup went bad." });
            return;
          }

          res.status(201).json(newUser);
        });
      })
      .catch((err) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy;
  req.logout();
  res.status(200).json({ message: "Log out successful!" });
});

router.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
