import Comment from './comment.model.js';

// Crear nuevo comentario para un post
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { name, content } = req.body;
    const comment = await Comment.create({
      post: postId,
      name,
      content
    });
    return res.status(201).json({
      message: 'Comentario creado',
      comment
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al crear comentario',
      error: err.message
    });
  }
};

// Obtener comentarios de un post ordenados del más reciente
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 });
    return res.json({ comments });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al obtener comentarios',
      error: err.message
    });
  }
};

// (Opcional) Eliminar un comentario — protegido para ADMIN
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    return res.json({ message: 'Comentario eliminado' });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al eliminar comentario',
      error: err.message
    });
  }
};
