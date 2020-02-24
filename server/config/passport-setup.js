const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      // config
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
