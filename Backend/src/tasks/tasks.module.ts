import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
