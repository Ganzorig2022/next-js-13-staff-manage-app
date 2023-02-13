import mongoose, { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
  image: String,
  // _id: String,
});

const UserModel = models?.User || mongoose.model('User', UserSchema);

export default UserModel;
