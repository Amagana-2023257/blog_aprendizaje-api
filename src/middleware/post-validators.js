import { body, param } from 'express-validator';
import { validarCampos } from './validate-fields.js';

export const postCreateValidator = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria'),
  body('course')
    .notEmpty().withMessage('El curso es obligatorio'),
  validarCampos
];

export const postIdValidator = [
  param('id')
    .isMongoId().withMessage('ID de post inválido'),
  validarCampos
];
