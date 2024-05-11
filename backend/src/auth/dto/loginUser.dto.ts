import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginUserDto {
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
  password: string;
}
