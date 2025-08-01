import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true,
    enum: []
  },
  tags: {
    type: [String],
    default: []
  },
  content: {
    type: String, 
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

export const Session =  mongoose.model('Session', sessionSchema);
