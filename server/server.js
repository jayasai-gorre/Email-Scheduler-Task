import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";


import emailRouter from "./Routes/emailRoutes.js";
import runEmailCron from "./cronJobs/cronJobs.js";  

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.get("/", (req, res) => {
  res.send("Email Scheduler Backend Running");
});


app.use("/api", emailRouter);


const PORT = process.env.PORT || 2345;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


cron.schedule("* * * * *", runEmailCron);
