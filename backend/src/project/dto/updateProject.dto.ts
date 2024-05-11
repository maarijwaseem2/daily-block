import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';

export class UpdateProjectDTO {
  @ApiPropertyOptional({
    description: 'Project Name',
    example: 'Hotel Management System',
  })
  @IsOptional()
  @IsString()
  project_name?: string;

  @ApiPropertyOptional({
    description: 'Project Category',
    example: 'Revenue, booking, Reservation',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'Project Start Date',
    example: '11/02/2024',
  })
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  start_date?: Date;

  @ApiPropertyOptional({
    description: 'Project End Date',
    example: '11/04/2024',
  })
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  end_date?: Date;

  @ApiPropertyOptional({
    description: 'Project  Cover Image',
    example: 'hotel_management.jpg',
  })
  @IsOptional()
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  upload_cover_image?: FileSystemStoredFile;
}
