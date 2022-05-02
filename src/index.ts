import express from "express"

import userRouter from "./routes/user"

const app = express()

app.use(express.json())
app.use("/users", userRouter)

app.listen(3333, () => {
  console.log("App is running")
})

export default app
