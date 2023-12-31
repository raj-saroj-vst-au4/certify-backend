import { json, urlencoded } from "body-parser";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import dbmethods from "./controllers/dbmethods";

export const createServer = (): Express => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(express.static(path.resolve(__dirname, "..") + "/public"))

    .post("/generatepdf", async (req: Request, res: Response) => {
      const { mailid, digits } = req.body;
      const gencertid = await dbmethods.handleGenerateCertificate(
        mailid,
        digits
      );
      if (gencertid) {
        return res.status(200).json({ certid: gencertid });
      } else {
        return res.status(404).json("Invalid / Not found");
      }
    })

    // .post("/addstudent", async (req: Request, res: Response) => {
    //   const { name, phone, email } = req.body;
    //   dbmethods.handleAddStudent(name, phone, email).then((output) => {
    //     return res.json(output);
    //   });
    // })

    .post("/fetchcertdata", async (req: Request, res: Response) => {
      const { certid } = req.body;
      const certifydata = await dbmethods.handleFetchCertData(certid);
      if (certifydata) {
        return res.status(200).json(certifydata);
      }
      return res.status(404).json({ data: "Certid not found" });
    })

    .get("/certifydown/:certid", async (req: Request, res: Response) => {
      const resultcert = await dbmethods.handleFetchCertUrl(
        parseInt(req.params.certid)
      );

      if (resultcert) {
        return res.redirect(resultcert);
      }
      return res.status(404).json({ certurl: "not found" });
    })
    .get("/", (_, res) => {
      return res.json({ status: { alive: true } });
    });

  return app;
};
