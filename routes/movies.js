const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");

router.put("/addtofavorite", async (req, res) => {
  const { userId, movieId, movieTitle, userName } = req.body;

  console.log("####", userName);
  try {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { favoriteMovies: movieId } },
      { new: true }
    );
    res.status(200).json(movieId);

    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error("Failed to create a testing account. " + err.message);
        return process.exit(1);
      }

      console.log("Credentials obtained, sending message...");

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      // Message object
      let message = {
        from: "Sender Name <sender@example.com>",
        to: `Recipient <${userName}>`,
        subject: "Nodemailer is unicode friendly ✔",
        text: "Hello to myself!",
        html: `<p>Hello ${userName} you have liked the movie ${movieTitle}</p>`,
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("Error occurred. " + err.message);
          return process.exit(1);
        }

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/removefromfavorite", async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { favoriteMovies: movieId } },
      { new: true }
    );
    res.status(200).json(movieId);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
