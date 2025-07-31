import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String, 
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  content: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
    },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
}, {
    timestamps: true,
});

sessionSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model('Session', sessionSchema);
