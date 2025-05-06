import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "A token was not provided in the request"
            });
        }

        token = token.replace(/^Bearer\s+/, "");

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist in the DB"
            });
        }

        if(!user.estadoCuenta){
            return res.status(400).json({
                success: false,
                message: "User was previously deactivated"
            });
        }

        req.usuario = user;
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Token validation error",
            error: err.message
        });
    }
};
