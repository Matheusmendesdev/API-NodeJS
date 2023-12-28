import 'reflect-metadata'
import express, { NextFunction, Response, Request } from "express"
import cors from "cors"
import router from "./routes"
import AppError from "./errors/AppError"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      })
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    })
  }
)
app.listen(3333, () => {
  console.log("Server started on port 3333!")
})
