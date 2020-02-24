const express = require("express");
// const cookieSession = require("cookie-session");
// const passport = require("passport");
const path = require("path");
const app = express();

//TODO: app.use()
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   cookieSession({
//     keys: ["mixerboxemulationissoawesomewowowo"]
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen("4000", () => {
  console.log("Server is now listening in port 4000!");
});
