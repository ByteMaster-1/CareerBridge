import express from "express";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));



const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


// → /opt/render/project/src
if (process.env.NODE_ENV === "production") {
  // Resolve to /opt/render/project/src/frontend/dist
  const spaDist = path.resolve(__dirname, "..", "frontend", "dist");

  // Serve static files
  app.use(express.static(spaDist));

  // Always return index.html for any other routes
  app.get("*", (_req, res) =>
    res.sendFile(path.join(spaDist, "index.html"))
  );
}


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})