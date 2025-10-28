const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          providerUid: profile.id,
          authProvider: "google"
        });

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
        }

        if (!user) {
          user = await User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value.toLowerCase(),
            phoneNumber: "N/A",
            passwordHash: "GOOGLE_OAUTH",
            authProvider: "google",
            providerUid: profile.id,
            vehicle: {},
            wallet: { balance: 0, loyaltyPoints: 0, defaultPaymentMethod: "wallet" },
            preferences: {
              preferredLanguage: "en",
              notificationsEnabled: true,
              renewablePriority: false
            }
          });
        } else {
          user.authProvider = "google";
          user.providerUid = profile.id;
          await user.save();
        }

        const token = jwt.sign(
          { id: user._id, email: user.email.toLowerCase() },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;