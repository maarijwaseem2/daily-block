import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { AdminGuard } from 'src/shared/guards/admin-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entitity/user.entity';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'User Authenticated successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Email or Password',
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiResponse({
    status: 200,
    description: 'Admin dashboard data:',
  })
  @Get('dashboard')
  getDashboard(@Request() req) {
    const user = req.user;
    return { message: 'Admin dashboard data: ', data: user };
  }
}
