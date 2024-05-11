import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'UI Design',
  })
  @IsOptional()
  @IsString()
  task_name?: string;

  @ApiPropertyOptional({
    example: 'https//localhost:3000/figma',
  })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiPropertyOptional({
    example: 'This design is only figma',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '343242-fd3-234m+32#2-32',
  })
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @ApiPropertyOptional({
    example: '45-3422-fd3-234m+32#2-32',
  })
  @IsOptional()
  @IsUUID()
  project_id?: string;
}
