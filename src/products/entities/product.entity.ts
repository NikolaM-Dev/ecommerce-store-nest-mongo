import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Brand } from './brand.entity';
import { CategorySchema, Category } from './category.entity';

@Schema()
export class Product extends Document {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: 'String', required: true })
  description: string;

  @Prop({ type: 'Number', requited: true, index: true })
  price: number;

  @Prop({ type: 'Number', required: true })
  stock: number;

  @Prop({ type: 'String', required: true })
  image: string;

  @Prop({ type: CategorySchema })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: Brand.name, required: true })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ price: 1, stock: -1 });
