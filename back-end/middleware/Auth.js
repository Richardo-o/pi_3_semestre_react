// import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";
import 'dotenv/config';


const JWTSecret = process.env.JWT_SECRET;

// Função de autenticação com JWT 
const Authorization = (req, res, next) => {
    const authToken = req.headers["authorization"];
    
    if (authToken != undefined) {
        const bearer = authToken.split(" ");
        const token = bearer[1];
        
        // ✅ Usando JWTSecret do userController
        jwt.verify(token, userController.JWTSecret, (err, data) => {
            if (err) {
                res.status(401).json({ error: "❌ Token inválido!" });
            } else {
                req.token = token;
                req.loggedUser = {
                    id: data.id,
                    email: data.email,
                };
                next();
            }
        });
    } else {
        res.status(401).json({ error: "❌ Token não fornecido" });
    }
};

export default Authorization;