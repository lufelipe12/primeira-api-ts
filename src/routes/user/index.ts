import { Router } from "express"

import UserController from "../../controllers/user"
import { authUser } from "../../middlewares/authToken.middleware"
import {
  userCreateSchema,
  validateUserCreate,
} from "../../middlewares/validateUserCreate.middleware"

const userRouter = Router()

userRouter.post("/", validateUserCreate(userCreateSchema), UserController.store)
userRouter.post("/login", UserController.login)
userRouter.get("/", UserController.index)
userRouter.get("/me", authUser, UserController.show)
userRouter.patch("/me", authUser, UserController.update)
userRouter.delete("/me", authUser, UserController.delete)

export default userRouter
