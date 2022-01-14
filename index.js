const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const session = require("express-session");

dotenv.config();

const app = express();

//import routes

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

app.use(
  session({
    secret: `secretkey`,
    resave: true,
    saveUninitialized: true,
  })
);

require("./passport")(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    // eslint-disable-next-line no-console
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  // eslint-disable-next-line no-console
  .catch((err) => console.error("Error connecting to mongo", err));

app.listen(8000, () => {
  console.log("server is listening");
});
