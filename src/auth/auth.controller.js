import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate_jwt.js";
 
export const register = async (req, res) => {
  try {
    const data = req.body;
    data.password = await hash(data.password);
 
    const user = await User.create(data);
 
    const token = await generateJWT(user.id);
 
    // Preparar objeto usuario sin la contraseña
    const userObj = user.toObject();
    delete userObj.password;
 
    return res.status(201).json({
      msg: "User has been created",
      userDetails: {
        token,
        user: userObj
      }
    });
  } catch (err) {
    return res.status(500).json({
      msg: "User registration failed",
      error: err.message
    });
  }
};
 
export const login = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Credenciales inválidas",
        error: "No existe el usuario o correo ingresado"
      });
    }
 
    // Verificar contraseña
    const validPassword = await verify(user.password, password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Credenciales inválidas",
        error: "Contraseña incorrecta"
      });
    }
 
    // Generar token
    const token = await generateJWT(user.id);
 
    // Preparar objeto usuario sin la contraseña
    const userObj = user.toObject();
    delete userObj.password;
 
    return res.status(200).json({
      msg: "Login successful",
      userDetails: {
        token,
        user: userObj
      }
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Login failed, server error",
      error: err.message
    });
  }
};
 
// Mantén tu función de creación de superadmin sin cambios
const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "ADMIN_ROLE" });
    if (adminExists) {
      console.log("El superadmin ya existe, no es necesario crearlo.");
      return;
    }
 
    const hashedPassword = await hash("ADMIN@123");
    const superAdmin = new User({
      name: "Super Admin",
      email: "superadmin@correo.com",
      username: "superadmin",
      password: hashedPassword,
      role: "ADMIN_ROLE",
      estadoCuenta: "Activa",
      nit: "cf"
    });
 
    await superAdmin.save();
    console.log("Superadmin creado correctamente.");
  } catch (error) {
    console.error("Error al verificar o crear el superadmin:", error.message);
  }
};
 
export default createAdmin;