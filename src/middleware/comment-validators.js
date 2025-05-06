import { body, param } from 'express-validator';
import { validarCampos } from './validate-fields.js';

export const commentCreateValidator = [
  param('postId')
    .isMongoId().withMessage('ID de post inválido'),
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('content')
    .notEmpty().withMessage('El contenido es obligatorio'),
  validarCampos
];

export const commentIdValidator = [
  param('id')
    .isMongoId().withMessage('ID de comentario inválido'),
  validarCampos
];
