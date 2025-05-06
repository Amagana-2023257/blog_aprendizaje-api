// src/middlewere/validate-token.js
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const validateJWT = async (req, res, next) => {
  try {
    let token = req.headers["authorization"] || req.query.token || req.body.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token no proporcionado" });
    }

    token = token.replace(/^Bearer\s+/, "");
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({ success: false, message: "Usuario no existe" });
    }
    if (user.estadoCuenta !== "Activa") {
      return res.status(403).json({ success: false, message: "Cuenta de usuario inactiva" });
    }

    req.usuario = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token inválido", error: err.message });
  }
};
