import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

void async function () {
  // REQUIRED MODULES
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // API 
  app.get("/api/sync", (req, res) => {
    const t1 = Date.now();
    const t0 = parseFloat(req.query["timestamp"] as string);

    res.json(isNaN(t0) ? {} : {
      t0, t1, t2: Date.now()
    });
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: Error, _r: unknown, res: express.Response, _n: unknown) => {
    console.error(error);
    res.sendStatus(500);
  });

  // Redirect users to /404 if the asked page is missing.
  app.all("*", (_, res) => {
    res.sendStatus(404);
  });

  app.listen(3000, () => {
    console.info("Listening to " + "http://127.0.0.1:3000");
  });
}();