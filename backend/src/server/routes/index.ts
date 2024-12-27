import { Router } from "express";

import { UsersController } from "../controllers";
import asyncHandler from "../middleware/asyncHandler";
const router = Router();

///
router.post("/users", asyncHandler(UsersController.create));
router.get('/users', asyncHandler(UsersController.getAll));
router.get('/users/:id', asyncHandler(UsersController.getById));
router.put("/users/:id", asyncHandler(UsersController.updateById));
router.delete("/users/:id", asyncHandler(UsersController.deleteById));

export { router };
