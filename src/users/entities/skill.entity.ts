import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Skill extends Document {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: 'String', required: true })
  color: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
