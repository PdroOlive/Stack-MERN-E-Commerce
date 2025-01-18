import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js'



dotenv.config()

const app = express();
const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL || "http://localhost:5000";

const __dirname = path.resolve()
app.use(express.json());

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (res, req) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist",
        "index.html"))
    })

}

app.listen(5000, () => {
    connectDB();
    console.log(`Server Started at ${baseUrl}:${port}`);
})

