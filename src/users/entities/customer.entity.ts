import { Document, Types } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: 'String' })
  lastName: string;

  @Prop({ type: 'Number', required: true })
  phone: string;

  @Prop({
    type: [{ name: { type: String }, color: { type: String } }],
  })
  skills: Types.Array<Record<string, any>>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
