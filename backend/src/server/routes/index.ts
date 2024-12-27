import { Router } from "express";

import { UsersController, ClassesController } from "../controllers";
import asyncHandler from "../middleware/asyncHandler";
const router = Router();

/// Users
router.post("/users", asyncHandler(UsersController.create));
router.get('/users', asyncHandler(UsersController.getAll));
router.get('/users/:id', asyncHandler(UsersController.getById));
router.put("/users/:id", asyncHandler(UsersController.updateById));
router.delete("/users/:id", asyncHandler(UsersController.deleteById));

// Classes
router.post("/classes", asyncHandler(ClassesController.create));
router.get('/classes', asyncHandler(ClassesController.getAll));
router.get('/classes/:id', asyncHandler(ClassesController.getById));
router.put("/classes/:id", asyncHandler(ClassesController.updateById));
router.delete("/classes/:id", asyncHandler(ClassesController.deleteById));

export { router };
