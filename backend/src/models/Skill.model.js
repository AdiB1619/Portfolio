import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['language', 'framework', 'tool', 'other'],
        message: 'Category must be one of: language, framework, tool, other',
      },
    },
    proficiency: {
      type: Number,
      required: [true, 'Proficiency is required'],
      min: [1, 'Proficiency must be at least 1'],
      max: [5, 'Proficiency cannot exceed 5'],
    },
    icon: {
      type: String,
      trim: true,
      default: null, // Icon slug (e.g. "react") or full URL
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
