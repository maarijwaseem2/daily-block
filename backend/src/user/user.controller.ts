import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto, UpdateUserDto } from './dto/updateUser.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { errorMessages, userMessages } from 'src/shared/constant/constant';
import { User } from './entitity/user.entity';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // User Signup
  @Post()
  @ApiResponse({
    status: 200,
    description: userMessages.userCreate,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: errorMessages.invalidInput,
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }

  // User Change Password
  @Patch('update_password/:id')
  @ApiResponse({
    status: 200,
    description: userMessages.passwordUpdate,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: errorMessages.userNotFound,
  })
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, updatePassword);
  }

  // User Get All
  @Get()
  @ApiResponse({
    status: 200,
    description: userMessages.allDetail,
    type: User,
  })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // User Get Only 1
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: userMessages.detailById,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: errorMessages.userNotFound,
  })
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.getUserById(id);
  }

  // User Update all detail except password
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: userMessages.userUpdate,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: errorMessages.userNotFound,
  })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // User delete your account
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: userMessages.userDelete,
  })
  @ApiResponse({
    status: 400,
    description: errorMessages.userNotFound,
  })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
