import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { Job } from "./models/job.model.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.get("/hello", async (req, res) => {
    let all = await Job.find({});
    console.log(all);

    await Job.create({
        title: "CEO",
        description: "CEO for your compary",
        requirements: ["Good Public Speaking", "Juice"],
        salary: 3,
        experienceLevel: 2,
        location: "Delhi NCR",
        jobType: "Shader Master",
        position: 6,
    })
    all = await Job.find({});
    console.log(all);

    await Job.findOneAndDelete({title: "Randi"});
    res.send("Done");

})



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})