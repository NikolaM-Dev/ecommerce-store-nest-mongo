import { Document, HookNextFunction } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ type: 'String', required: true, unique: true })
  email: string;

  @Prop({ type: 'String', required: true })
  password: string;

  @Prop({ type: 'String', required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: HookNextFunction) {
  const user = this as User;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

UserSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, password, ...user } = this.toObject();

  return user;
};
