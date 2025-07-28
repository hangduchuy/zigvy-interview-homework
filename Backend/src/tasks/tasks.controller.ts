import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    schema: {
      example: {
        _id: '64f7c0c9e123456789abcd01',
        title: 'Buy groceries',
        description: 'Milk, bread, eggs',
        dueDate: '2025-08-01T00:00:00.000Z',
        status: 'To Do',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'title must not be empty',
          'dueDate must be a valid ISO date',
        ],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    schema: {
      example: {
        _id: '64f7c0c9e123456789abcd01',
        title: 'Updated task',
        description: 'Updated description',
        dueDate: '2025-08-01T00:00:00.000Z',
        status: 'In Progress',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Task not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid update input',
    schema: {
      example: {
        statusCode: 400,
        message: ['title must be a string'],
        error: 'Bad Request',
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
    schema: {
      example: {
        message: 'Task deleted successfully',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  findAll() {
    return this.taskService.findAll();
  }
}
