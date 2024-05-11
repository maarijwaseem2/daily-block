import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';

export class CreateProjectDTO {
  @ApiProperty({
    description: 'Project Name',
    example: 'Hotel Management System',
  })
  @IsNotEmpty()
  @IsString()
  project_name: string;

  @ApiProperty({
    description: 'Project Category',
    example: 'Revenue, booking, Reservation',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Project Start Date',
    example: '11/02/2024',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  start_date: Date;

  @ApiProperty({
    description: 'Project End Date',
    example: '11/04/2024',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  end_date: string;

  @ApiProperty({
    description: 'Project  Cover Image',
    example: 'hotel_management.jpg',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  upload_cover_image: FileSystemStoredFile;
}
