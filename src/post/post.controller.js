import Post from './post.model.js';

// Crear nueva publicación
export const createPost = async (req, res) => {
  try {
    const { title, description, course } = req.body;
    const post = await Post.create({ title, description, course });
    return res.status(201).json({
      message: 'Post creado exitosamente',
      post
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al crear el post',
      error: err.message
    });
  }
};

// Listar posts (opcionalmente filtrar por curso)
export const getPosts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.course) filter.course = req.query.course;
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    return res.json({ posts });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al obtener los posts',
      error: err.message
    });
  }
};

// Obtener un post por ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    return res.json({ post });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al obtener el post',
      error: err.message
    });
  }
};

// Actualizar un post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, course } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { title, description, course },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    return res.json({
      message: 'Post actualizado',
      post
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al actualizar el post',
      error: err.message
    });
  }
};

// Eliminar un post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    return res.json({ message: 'Post eliminado correctamente' });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al eliminar el post',
      error: err.message
    });
  }
};
