import express from "express";
const userRoutes = express.Router();
import userController from "../controllers/userController.js";
import upload from "../config/multerConfig.js"; 

// Endpoint para listar todos os usuários
userRoutes.get("/user", userController.getAllUsers);

// Endpoint para criar usuário COM upload
userRoutes.post("/user", upload.single('profileImage'), userController.createUser);

// Endpoint para deletar usuario
userRoutes.delete("/user/:id", userController.deleteUser);

// Endpoint para atualizar usuario
userRoutes.put("/user/:id", userController.updateUser)

// Endpoint para listar um único user
userRoutes.get("/user/:id", userController.getUserById);

// Endpoint para login
userRoutes.post("/user/login", userController.loginUser);

export default userRoutes;