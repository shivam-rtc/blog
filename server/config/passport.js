const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log("user auth cred", user);
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            avatar: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


// user {
//   _id: new ObjectId('67d7c9b82f8f1adf4b0ae76d'),
//   name: 'shivam maurya',
//   email: 'shivamrtctek@gmail.com',
//   googleId: '106787360137729493339',
//   avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKDtlRPfZFv-SDMU9Y1Yf6K6R9QaFFln4GnUzC3rWGBXZEgRg=s96-c',        
//   __v: 0
// }