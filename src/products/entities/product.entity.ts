import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product extends Document {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: 'String', required: true })
  description: string;

  @Prop({ type: 'Number', requited: true })
  price: number;

  @Prop({ type: 'Number', required: true })
  stock: number;

  @Prop({ type: 'String', required: true })
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
