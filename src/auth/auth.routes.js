import { Router } from "express"
import { register,login } from "./auth.controller.js"
import { registerValidator, assignClientRole,loginValidator } from "../middleware/user-validator.js"

const router = Router();

// metodo de registrar
router.post(
    "/register",
    assignClientRole,
    registerValidator, 
    
    register
);


router.post(
    "/login",
    loginValidator,
    login
)

export default router;