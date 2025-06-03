import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  walletAddress: { type: String },
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);
