import express from "express";
import Data from "../data";
const Router = express.Router();

// this is our get method
// this method fetches all available data in our database
Router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
Router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
Router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
Router.post("/putData", (req, res) => {
  let data: any = new Data();

  const { name, login, password } = req.body;

  if (!name || !login || !password) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.name = name;
  data.login = login;
  data.password = password;
  data.save((err: any) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

export default Router;
