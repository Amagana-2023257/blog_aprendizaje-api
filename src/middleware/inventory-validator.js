import { body, param } from "express-validator";
import { productExists } from "../helpers/db_validator.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validateJWT.js";
import { hasRoles } from "./validate-roles.js";

export const createValidator = [
    validateJWT,
    hasRoles("EMPLOYEE_ROLE", "ADMIN_ROLE"),
    param("productId").notEmpty().withMessage("El id del producto es requerido"),
    body("quantity").notEmpty().withMessage("La cantidad es requerida"),
    validarCampos,
    handleErrors
]

export const getInventoryValidator = [
    validateJWT,
   hasRoles("EMPLOYEE_ROLE", "ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const deleteInventoryValidator = [
    validateJWT,
    hasRoles("EMPLOYEE_ROLE", "ADMIN_ROLE"),
    param("productId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("productId").custom(productExists),
    validarCampos,
    handleErrors
]