import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: 'String', required: true })
  email: string;

  @Prop({ type: 'String', required: true })
  password: string;

  @Prop({ type: 'String', required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
