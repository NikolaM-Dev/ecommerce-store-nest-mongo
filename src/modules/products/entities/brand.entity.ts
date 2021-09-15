import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class Brand extends Document {
  @Prop({ type: 'String', required: true, unique: true })
  name: string;

  @Prop({ type: 'String', required: true })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
