import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsIn,
} from 'class-validator';
import { UserRole } from '../userRole.enum';
import { errorMessages } from 'src/shared/constant/constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'first name of the User',
    example: 'maarij',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/, {
    message: errorMessages.firstName,
  })
  first_name: string;

  @ApiProperty({
    description: 'last name of the User',
    example: 'waseem',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/, {
    message: errorMessages.lastName,
  })
  last_name: string;

  @ApiProperty({
    description: 'Email Address of the User',
    example: 'maarijwaseem7@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the User',
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @ApiProperty({ enum: ['admin', 'user'] })
  @IsNotEmpty()
  @IsString()
  @IsIn([UserRole.Admin, UserRole.User], {
    message: errorMessages.role,
  })
  role: UserRole;
}
