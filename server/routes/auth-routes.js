const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.send("Login page");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/login"
  }),
  (req, res) => {
    res.send("you are logging in!");
  }
);

module.exports = router;
