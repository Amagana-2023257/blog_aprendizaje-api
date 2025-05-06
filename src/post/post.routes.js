import { Router } from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from './post.controller.js';
import {
  postCreateValidator,
  postIdValidator
} from '../middleware/post-validators.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Endpoints para gestionar publicaciones del blog
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     tags: [Posts]
 *     summary: Crear nueva publicación
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Publicación creada
 */
router.post(
  '/',
  postCreateValidator,
  createPost
);

/**
 * @swagger
 * /posts:
 *   get:
 *     tags: [Posts]
 *     summary: Obtener lista de publicaciones (opcionalmente filtrar por curso)
 *     parameters:
 *       - in: query
 *         name: course
 *         schema:
 *           type: string
 *         description: Curso por el cual filtrar
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 */
router.get('/', getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Obtener una publicación por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la publicación
 */
router.get('/:id', postIdValidator, getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Actualizar publicación existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Publicación actualizada
 */
router.put(
  '/:id',
  postIdValidator,
  postCreateValidator,
  updatePost
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Eliminar publicación
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación eliminada
 */
router.delete(
  '/:id',
  postIdValidator,
  deletePost
);

export default router;
