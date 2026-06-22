import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Never returned in query results by default
    },
    role: {
      type: String,
      enum: { values: ['admin'], message: 'Role must be "admin"' },
      default: 'admin',
    },
  },
  { timestamps: true }
);

// Note: unique:true on the email field above already creates the index.
// No need for a redundant schema.index() call.

// ── Pre-save hook: hash the password whenever it is set or modified ────────────
// Mongoose 9: async pre-hooks must NOT call next() — the returned promise
// is awaited automatically. Calling next() in an async function throws.
userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) return;
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// ── Instance method: compare a plaintext candidate against the stored hash ─────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
export default User;
