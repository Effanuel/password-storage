import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const Schema = mongoose.Schema;

// this will be our data base's data structure
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

interface IUser extends mongoose.Document {
  username: string;
  password: string;
  tokens: [];
}

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "test");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async (username: any, password: any) => {
  const user = await User.findOne({ username });

  if (!user) {
    console.log("Unable");
    throw new Error("Unable to login");
  }
  const hashed = await require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isMatch = hashed == user.password;

  if (!isMatch) {
    throw new Error("Unable to login, wrong password");
  }

  return user;
};

// Hash the plain text password before saving
UserSchema.pre("save", async function(next) {
  const user: any = this;
  console.log(user);

  if (user.isModified("password")) {
    user.password = await require("crypto")
      .createHash("sha256")
      .update(user.password)
      .digest("hex");
  }

  next();
});

// export the new Schema so we could modify it using Node.js
const User: any = mongoose.model<any>("User", UserSchema);

export { User };
