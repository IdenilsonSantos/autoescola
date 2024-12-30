import { Router } from "express";

import { UsersController, ClassesController, UserClassesController } from "../controllers";
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

// UserClasses
router.post("/user_classes", asyncHandler(UserClassesController.create));
router.post("/user_classes_many", asyncHandler(UserClassesController.createMany));
router.get('/user_classes', asyncHandler(UserClassesController.getAll));
router.get('/user_classes/:id', asyncHandler(UserClassesController.getById));
router.get('/user_classes/user/:id', asyncHandler(UserClassesController.getByUserId));
router.put("/user_classes/user/:user_id/class/:class_id", asyncHandler(UserClassesController.updateStatusByUserId));
/* router.get('/classes', asyncHandler(ClassesController.getAll));
router.get('/classes/:id', asyncHandler(ClassesController.getById));
router.put("/classes/:id", asyncHandler(ClassesController.updateById));
router.delete("/classes/:id", asyncHandler(ClassesController.deleteById)); */

export { router };
