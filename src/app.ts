import express, { Express } from "express";
import { router } from "./routes/CartRoutes";
import "./controllers/CartController";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();
const port: number = 3000;

const allowedOrigins: string[] = ["http://localhost:3001", "https://main--mellifluous-cucurucho-d51433.netlify.app"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true, //access-control-allow-credentials:true
  optionsSuccessStatus: 200,
};

app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  return console.log(`Listening on port ${port}!`);
});
