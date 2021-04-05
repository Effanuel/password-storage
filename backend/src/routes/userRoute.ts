import express from "express";
import {User} from "../models/user";
import {auth} from "../middleware/auth";
const Router = express.Router();

Router.post("/signup", async (req, res) => {
  let data: any = new User();
  data.username = req.body.username;
  data.password = req.body.password;
  data.save((err: any) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true});
  });
});

Router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (error) {
    console.log(error);
    res.status(400).send({error});
  }
});

Router.post("/logout", auth, async (req: any, res) => {
  console.log(req.user, "USER REQ");
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

Router.get("/getLogin", async (req, res) => {
  console.log("success");
  User.find((err: any, data: any) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true, data: data});
  });
});

/// TEST
Router.delete("/deleteLogins", async (req, res) => {
  User.deleteMany((err: any) => {
    if (err) return res.send(err);
    return res.json({success: true});
  });
});

export default Router;
