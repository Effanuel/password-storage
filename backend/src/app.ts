import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import path from "path";
import mongoose from "mongoose";

import {userRoute, dataRoute} from "./routes";
import morgan from "morgan";
import {logger} from "./util/logger";

const port = process.env.PORT || 3001;
const app: express.Application = express();

app.set("port", port);
app.use(helmet());
app.use(cors());
app.disable("etag").disable("x-powered-by");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/api", dataRoute);
app.use("/user", userRoute);

if (process.env.NODE_ENV != "development ") {
  // Init logger

  // Serve any static files
  app.use(express.static(path.join(__dirname, "../../client/build")));

  // Handle React routing, return all requests to React app
  app.get("/*", function (req: express.Request, res: express.Response) {
    res.sendFile(path.join(__dirname, "../../", "client/build/index.html"));
  });
}

// const pass = config.pass;
// const user = config.user;
// const dbRoute = `mongodb+srv://${user}:${pass}@cluster0-hoja9.mongodb.net/test?retryWrites=true&w=majority`;

// connects our back end code with the database
mongoose.connect(
  "mongodb://localhost:27017/mydatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
  // () => {
  //   mongoose.connection.db.dropDatabase();
  // }
);

let db = mongoose.connection;
db.once("open", () => logger.info("Connected to the database."));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// ============LOGGING============
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";

app.use(
  morgan(morganFormat, {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);

app.use(
  morgan(morganFormat, {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);

app.get("/", function (req, res) {
  logger.debug("Debug statement");
  logger.info("Info statement");
  res.send(req.method + " " + req.originalUrl);
});

app.get("/error", function (req, res) {
  throw new Error("Problem Here!");
});

// All errors are sent back as JSON
app.use((err: any, req: any, res: any, next: any) => {
  // Fallback to default node handler
  if (res.headersSent) {
    next(err);
    return;
  }

  logger.error(err.message, {url: req.originalUrl});

  res.status(500);
  res.json({error: err.message});
});

// Start server
app.listen(port, function () {
  logger.info("Example app listening on port " + port);
});
// ============LOGGING============

// append /api for our http requests

// const server = app.listen(app.get("port"), () => {
//   console.log(
//     "  App is running at http://localhost:%d in %s mode",
//     app.get("port"),
//     app.get("env")
//   );
//   console.log("  Press CTRL-C to stop\n");
// });
