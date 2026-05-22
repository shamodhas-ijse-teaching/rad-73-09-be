// Force Node to use a public DNS that handles SRV records properly
import dns from "node:dns"
dns.setServers(["8.8.8.8", "8.8.4.4"])

import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import customerRoutes from "./routes/customerRoutes"
import itemRoutes from "./routes/itemRoutes"
import authRoutes from "./routes/authRoutes"
import postRouter from "./routes/postRouter"
import aiRoutes from "./routes/aiRoutes"
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL || ""

// Goble Middlewares (avery request)
app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//   next()
// })

// Mount routes
app.get("/", (req, res) => {
  res.send("Ok")
})
app.use("/api/v1/customer", customerRoutes)
app.use("/api/v1/item", itemRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/ai", aiRoutes)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB connected..!")
    // app.listen(5000, () => {
    //   console.log("Server running on port: 50000")
    // })
  })
  .catch((err) => {
    console.error("Reason:", err.message)
    console.error("Fail to connect DB..!")
  })

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT)
})
