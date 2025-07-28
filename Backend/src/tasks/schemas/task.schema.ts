import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true, enum: ['To Do', 'In Progress', 'Done'] })
  status: string;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
