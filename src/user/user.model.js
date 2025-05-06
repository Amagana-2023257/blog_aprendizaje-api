import { Schema, model } from "mongoose";

const userSchema = Schema({

  name: {
    type: String,
    required: true,
  },
  surname:{
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },

  role: {
    type: String,
    enum: ["EMPLOYEE_ROLE", "ADMIN_ROLE"], 
  },
  estadoCuenta: {
    type: String,
    enum: ["Activa", "Inactiva"],
    default: "Activa",
  },
});


export default model("User", userSchema);