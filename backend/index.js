import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDb from './utils/db.js';
import dotenv from 'dotenv';
dotenv.config({});
import path from 'path';

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: ["https://job-portal-frontend-43oe.onrender.com"],
    credentials: true,
};
app.use(cors(corsOption));


app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running"
    });
});

//user routes
import userRouter from './routes/user.route.js';
app.use("/api/users", userRouter);

//company routes
import companyRouter from './routes/company.route.js';
app.use("/api/company", companyRouter);

//job routes
import jobRouter from './routes/job.route.js';
app.use("/api/job", jobRouter);

//application routes
import applicationRouter from './routes/application.route.js';
app.use("/api/application", applicationRouter);


// deployment code....................

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// app.get('.*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`server is running on port ${PORT}`));