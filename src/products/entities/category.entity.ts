import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ type: 'String', required: true, unique: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
