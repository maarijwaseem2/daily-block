import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserRole } from '../userRole.enum';
import { errorMessages } from 'src/shared/constant/constant';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'first name of the User',
    example: 'maarij',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/, {
    message: errorMessages.firstName,
  })
  first_name: string;

  @ApiPropertyOptional({
    description: 'last name of the User',
    example: 'waseem',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/, {
    message: errorMessages.lastName,
  })
  last_name: string;

  @ApiPropertyOptional({
    description: 'Email Address of the User',
    example: 'maarijwaseem7@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ enum: ['admin', 'user'] })
  @IsNotEmpty()
  @IsString()
  @IsIn([UserRole.Admin, UserRole.User], {
    message: errorMessages.role,
  })
  role: UserRole;
}

export class UpdatePasswordDto {
  @ApiPropertyOptional({
    description: 'Update Password of the User',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}
