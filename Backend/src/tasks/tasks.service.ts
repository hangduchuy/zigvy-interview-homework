import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(dto: CreateTaskDto) {
    return this.taskModel.create(dto);
  }

  async update(id: string, dto: UpdateTaskDto) {
    const updated = await this.taskModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.taskModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Task not found');
    return { message: 'Deleted successfully' };
  }

  findAll() {
    return this.taskModel.find();
  }
}
