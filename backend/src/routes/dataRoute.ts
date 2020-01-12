import express from "express";
import { Data } from "../models";
import { logger } from "../util/logger";
import { auth } from "../middleware/auth";
const Router = express.Router();
// this is our get method
// this method fetches all available data in our database
Router.get("/getData", async (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    logger.info("GET DATA success.");
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
Router.post("/updateData", async (req, res) => {
  const { filter, update } = req.body.data;
  Data.findOneAndUpdate(filter, update, err => {
    if (err) return res.json({ success: false, error: err });
    logger.info("UPDATE DATA success.");
    return res.json({ success: true });
  });
});

// DELETE BY ID
Router.delete("/deleteData", async (req, res) => {
  const { _id } = req.body;
  Data.findOneAndRemove({ _id }, err => {
    if (err) return res.send(err);
    logger.info("DELETE DATA success.");
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
Router.post("/putData", async (req, res) => {
  const { name, login, password } = req.body;

  if (!name || !login || !password) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  let data: any = new Data(req.body);
  data.save((err: any) => {
    if (err) return res.json({ success: false, error: err });
    logger.info("ADD DATA success.");

    return res.json({ success: true });
  });
});

export default Router;
