import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import webpackMiddleware from "webpack-dev-middleware";

const app = express();

const isDevelopment = process.env.NODE_ENV !== "production";
const appUrl = process.env.APP_URL

if (isDevelopment)  {
  const compiler = webpack(webpackConfig);
  // Set up webpack hot reloading
  app.use(webpackMiddleware(webpack(webpackConfig)));

  app.use(require("webpack-hot-middleware")(compiler));
}

// View engine setup
app.set("views", path.join(__dirname, "client/views"));
app.set("view engine", "pug");

app.use(
  logger("dev", {
    skip: () => app.get("env") === "test"
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "8bits8bars",
    teaserImage: `${appUrl}/images/logo.png`
  });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render("error", {
    message: err.message
  });
});

export default app;
