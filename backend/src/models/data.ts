import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

// DataSchema.methods.generateAuthToken = async function() {
//   const auth = this;
//   const token = jwt.sign({ _id: auth.authentication.password }, "secret");

//   auth.tokens = auth.tokens.concat({ token });
//   await auth.save();
//   return token;
// };

// DataSchema.statics.findByCredentials = async (password: string) => {
//   const user = await Data.findOne({ authentication: { password } });

//   if (!user) {
//     throw new Error("Unable to login.");
//   }

//   // const isMatch = await.
// };
// export the new Schema so we could modify it using Node.js
const Data = mongoose.model("Data", DataSchema);

export {Data};
