import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface extending Document
export interface User extends Document {
  email: string;
  password: string;
}

// Create the User Schema with proper types
const UserSchema: Schema<User> = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure email is unique
      lowercase: true, // Store emails in lowercase
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Use mongoose.models to check if the model already exists
const UserModel =
  mongoose.models?.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
