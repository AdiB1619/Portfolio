import mongoose from 'mongoose';

// Loose URL pattern — accepts http(s) and relative paths used during dev
const URL_REGEX = /^(https?:\/\/).+/;

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    longDescription: {
      type: String,
      required: [true, 'Long description is required'],
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length >= 1,
        message: 'Tech stack must contain at least one item',
      },
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
      match: [URL_REGEX, 'imageUrl must be a valid http/https URL'],
    },
    liveUrl: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: (v) => v === null || v === '' || URL_REGEX.test(v),
        message: 'liveUrl must be a valid http/https URL',
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: (v) => v === null || v === '' || URL_REGEX.test(v),
        message: 'githubUrl must be a valid http/https URL',
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
      min: [0, 'Order cannot be negative'],
    },
  },
  { timestamps: true }
);

// ── Indexes ────────────────────────────────────────────────────────────────────
projectSchema.index({ order: 1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
