import { config } from "dotenv";
import express from "express";
import Razorpay from "razorpay";
import router from "./paymentRouter.js";
import cors from "cors"

config({ path: "./config.env" });

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", router);

export const instance = new Razorpay({
    key_id: process.env.Key_Id,
    key_secret: process.env.key_secret,
});

// Other middleware and route definitions can go here

const PORT = process.env.PORT || 4000; // Use a default port if not specified in .env

app.get("/api/getkey",(req,res)=>res.status(200).json({key:process.env.Key_Id}))
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
