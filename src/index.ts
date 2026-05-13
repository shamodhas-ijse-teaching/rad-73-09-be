import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import customerRoutes from "./routes/customerRoutes"
import itemRoutes from "./routes/itemRoutes"
import authRoutes from "./routes/authRoutes"
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
app.use("/api/v1/customer", customerRoutes)
app.use("/api/v1/item", itemRoutes)
app.use("/api/v1/auth", authRoutes)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB connected..!")
    // app.listen(5000, () => {
    //   console.log("Server running on port: 50000")
    // })
  })
  .catch((err) => console.error("Fail to connect DB..!"))

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT)
})
