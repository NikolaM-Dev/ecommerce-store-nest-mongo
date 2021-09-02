import { Document, Types } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

import { SkillSchema, Skill } from './skill.entity';

@Schema()
export class Customer extends Document {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: 'String' })
  lastName: string;

  @Prop({ type: 'Number', required: true })
  phone: string;

  @Prop({ type: [SkillSchema] })
  skills: Types.Array<Skill>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
