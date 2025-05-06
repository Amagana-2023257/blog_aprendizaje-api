import { Schema, model, Types } from 'mongoose';

const CommentSchema = new Schema({
  post: {
    type: Types.ObjectId,
    ref: 'Post',
    required: [true, 'El post asociado es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre del autor es obligatorio']
  },
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Comment', CommentSchema);
