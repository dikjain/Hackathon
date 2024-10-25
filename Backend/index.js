import express from "express"
import cors from "cors"
import connectDB from "./db/db.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import gigRoutes from "./routes/Gigs.route.js"
import http from "http"
import dotenv from "dotenv";


const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const server = http.createServer(app);
app.use(cors({
    origin: "*",
    Credential:true,
    methods: "GET, POST, PUT, DELETE",
}))

app.use("/api/user", userRoutes);
app.use("/api/gigs", gigRoutes);

dotenv.config();

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});

