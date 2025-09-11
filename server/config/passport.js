const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/UserSchema");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try to find user by providerUid + authProvider
        let user = await User.findOne({
          providerUid: profile.id,
          authProvider: "google"
        });

        // If not found, maybe user registered manually with same email
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
        }

        // If still not found, create new
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
          // update provider info if logging with google first time
          user.authProvider = "google";
          user.providerUid = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;