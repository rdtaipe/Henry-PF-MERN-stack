import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";

import userModel from "../models/user.js";

const createUser = async (newUser) => {
  try {
    const user = await userModel.create(newUser);
    user.password = await user.encryptPassword(user.password);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { fullname, birthDate, genre, country, address, tel, image } =
        req.body;
      try {
        const userExists = await userModel.find({ email: email });

        if (userExists.length)
          return done(null, false, { message: "Email ya registrado" });

        const newUser = await createUser({
          fullname,
          birthDate,
          genre,
          country,
          address,
          tel,
          image,
          email,
          password,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userExists = await userModel.findOne({ email: email });

        const compare = await userExists.matchPassword(password);

        if (!compare) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        return done(null, userExists);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_KEY_GOOGLE,
      callbackURL: `${process.env.BACK_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;
 
      // Aquí puede guardar la información del usuario en su base de datos
      const userExists = await userModel.find({ email: email });

      if (userExists.length) {
        return done(null, userExists);
      }

      const newUser = await userModel.create({
        password: id,
        fullName: displayName,
        email: email,
        /* image: profile.photo[0].value, */
      });

      return done(null, newUser);
    }
  )
);

// Serializar el usuario para almacenarlo en una sesión
passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user[0]._id.toString());
});

// Deserializar el usuario para obtener su información de la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
