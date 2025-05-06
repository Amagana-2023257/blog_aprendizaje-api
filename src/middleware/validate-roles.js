// src/middlewere/validate-roles.js
export const hasRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.usuario) {
        return res.status(500).json({
          success: false,
          message: "El token debe validarse antes de comprobar roles"
        });
      }
  
      if (!allowedRoles.includes(req.usuario.role)) {
        return res.status(403).json({
          success: false,
          message: `Usuario no autorizado. Se requiere uno de estos roles: ${allowedRoles.join(", ")}`
        });
      }
  
      next();
    };
  };
  