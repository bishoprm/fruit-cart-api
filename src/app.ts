import express, { Express, Request, Response } from "express";
import { router } from "./routes/CartRoutes";
import "./controllers/CartController";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  return console.log(`Listening on port ${port}!`);
});
