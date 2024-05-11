import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'UI Design',
  })
  @IsNotEmpty()
  @IsString()
  task_name: string;

  @ApiProperty({
    example: 'https//localhost:3000/figma',
  })
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty({
    example: 'This design is only figma',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: '343242-fd3-234m+32#2-32',
  })
  @IsUUID()
  user_id: string;

  // @ApiProperty({
  //   example: '45-3422-fd3-234m+32#2-32',
  // })
  // @IsUUID()
  // project_id: string;
}
