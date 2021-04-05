import jwt from "jsonwebtoken";
import User from "../models/user";

const auth = async (req, res, next) => {
  console.log("user", req.user);
  try {
    const token =
      req.header("Authorization").replace("Bearer ", "") ||
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"];
    const decoded = jwt.verify(token, "test");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(token, req.user);

    if (!user) {
      throw new Error("Authenticate");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({error: "Authenticate"});
  }
};

export {auth};
