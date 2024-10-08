import mongoose, {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  phone: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface ProductMutation {
  user: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string | null;
}
