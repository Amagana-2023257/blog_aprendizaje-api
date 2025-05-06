import { Router } from 'express';
import {
  createComment,
  getCommentsByPost,
  deleteComment
} from './comment.controller.js';
import {
  commentCreateValidator,
  commentIdValidator
} from '../middleware/comment-validators.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Endpoints para gestionar comentarios de posts
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Agregar comentario a un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario creado
 */
router.post(
  '/posts/:postId/comments',
  commentCreateValidator,
  createComment
);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Obtener comentarios de un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios
 */
router.get(
  '/posts/:postId/comments',
  getCommentsByPost
);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Eliminar un comentario
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
 *         description: Comentario eliminado
 */
router.delete(
  '/comments/:id',
  commentIdValidator,
  deleteComment
);

export default router;
