const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("cookie-session");
const User = require("./models/User");
const TaskCollection = require("./models/TaskCollection");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  session({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log("connected to DB");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

app.get("/api/message", (req, res) => {
  res.send("FINA-FUCKING-LY");
});

passport.use(
  new GoogleStrategy(
    {
      proxy: true,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback/",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          photo: profile.photos[0].value,
          email: profile.email,
          googleId: profile.id,
        });
        user = await newUser.save();
        await TaskCollection.create({
          userId: user._id,
          tasks: [
            { title: "To-Do", columnColor: "red", items: [] },
            { title: "In-Progress", columnColor: "yellow", items: [] },
            { title: "Done", columnColor: "green", items: [] },
          ],
        });
      }

      cb(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let deserializedUser;
  try {
    deserializedUser = await User.findById(id);
  } catch (err) {
    done(err, null);
  }
  if (deserializedUser) {
    done(null, deserializedUser);
  }
});

app.get("/failed", (req, res) => {
  res.send("Failed to login");
});

//GET ROUTE FOR TESTING PURPOSE,CONVERT TO POST ROUTE LATER
app.get("/logout", async (req, res) => {
  req.logOut();

  if (process.env.NODE_ENV === "development") {
    res.redirect(process.env.CORS_ORIGIN);
  } else {
    res.redirect("/");
  }
});

app.get("/dummy", (req, res) => {
  res.send("WHAT THE FUCK");
});

app.get(
  "/auth/google/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback/",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET
    );
    console.log("Making Token " + token);
    // Successful authentication, redirect home.
    if (process.env.NODE_ENV === "development") {
      res.redirect(`${process.env.CORS_ORIGIN}/getToken?token=${token}`);
    } else if (process.env.NODE_ENV === "mobile") {
      console.log("passed");
      res.redirect(`boardliaapp://boardliaapp.io?token=${token}`);
    } else {
      res.redirect(`/getToken?token=${token}`);
    }
  }
);

app.get("/user", (req, res, next) => {
  res.send(req.user);
});

app.use("/tasks", require("./routes/tasks"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get(["*"], (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("server is working");
  });
}
