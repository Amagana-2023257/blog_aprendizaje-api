import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  course: {
    type: String,
    required: [true, 'El curso asociado es obligatorio']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Post', PostSchema);
