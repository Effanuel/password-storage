import mongoose from "mongoose";
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    id: Number,
    name: String,
    login: String,
    password: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
export default mongoose.model("Data", DataSchema);
