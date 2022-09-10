import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from './routers/authRouter.js'

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())

app.use(router)

const PORT = process.env.PORT
app.listen(PORT || 5000, () => console.log(`server listen on port ${PORT}`))