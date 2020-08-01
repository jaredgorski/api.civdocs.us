const getApiHost = () => {
  switch (process.env.NODE_ENV) {
    case'development':
      return 'http://localhost:7687'
      break;
    case 'production':
    default:
      return 'http://api.civdocs.us'
      break;
  }
};
process.env.API_HOST = getApiHost();

import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";

import * as homeController from "./controllers/home";
import * as docsController from "./controllers/docs";

const app = express();

app.set("port", process.env.PORT || 7687);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homeController.index);
app.get("/docs", docsController.index);
app.get("/docs/:document", docsController.getDocument);
app.get("/docs/:document/:section", docsController.getDocument);
app.get("/docs/:document/:section/:paragraph", docsController.getDocument);

export default app;
