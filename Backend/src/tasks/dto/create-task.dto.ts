import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Milk, bread, eggs' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-08-01T00:00:00.000Z' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    example: 'To Do',
    enum: ['To Do', 'In Progress', 'Done'],
  })
  @IsString()
  @IsEnum(['To Do', 'In Progress', 'Done'])
  status?: 'To Do' | 'In Progress' | 'Done';
}
