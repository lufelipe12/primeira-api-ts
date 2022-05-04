import { Router } from "express"

import UserController from "../../controllers/user"
import verifyAuthToken from "../../middlewares/authToken.middleware"

const userRouter = Router()

userRouter.post("/", UserController.store)
userRouter.post("/login", UserController.login)
userRouter.get("/", UserController.index)
userRouter.get("/:id", verifyAuthToken, UserController.show)

export default userRouter
