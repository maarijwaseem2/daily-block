import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entitity/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { validate } from 'class-validator';
import { ValidationError } from 'class-validator';
import { UpdatePasswordDto, UpdateUserDto } from './dto/updateUser.dto';
import { errorMessages, userMessages } from 'src/shared/constant/constant';
import { NotificationService } from 'src/notification/notification.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notificationService: NotificationService,
  ) {}

  private formatResponse(message: string, data: any) {
    return { message, data };
  }
  async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; data: any }> {
    const userDto = Object.assign(new CreateUserDto(), createUserDto);
    const errors: ValidationError[] = await validate(userDto);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new BadRequestException(
        this.formatResponse(errorMessages.failed, errorMessage),
      );
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      const errorMessage = errorMessages.invalidInput;
      throw new BadRequestException(
        this.formatResponse(errorMessage, errorMessage),
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role,
    });

    const savedUser = await this.userRepository.save(newUser);

    await this.notificationService.createUserVerificationNotification(
      savedUser,
    );

    const firstWithId = await this.userRepository.findOne({
      where: { id: savedUser.id },
    });
    return this.formatResponse(userMessages.userCreate, {
      User: {
        id: firstWithId.id,
        first_name: firstWithId.first_name,
        last_name: firstWithId.last_name,
        email: firstWithId.email,
        role: firstWithId.role,
      },
      notification: 'Verification notification created',
    });
  }

  // User Get All
  async getAllUsers(): Promise<{ message: string; data: User[] }> {
    const users = await this.userRepository.find({
      select: ['id', 'first_name', 'last_name', 'email', 'role'],
    });
    return this.formatResponse(userMessages.allDetail, users);
  }

  // User get only 1
  async getUserById(id: string): Promise<{ message: string; data: any }> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      const errorMessage = errorMessages.userNotFound;
      throw new BadRequestException(
        this.formatResponse(errorMessage, errorMessage),
      );
    }
    return this.formatResponse(userMessages.detailById, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    });
  }

  // User update all detail except password
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; data: any }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      const errorMessage = errorMessages.userNotFound;
      throw new BadRequestException(
        this.formatResponse(errorMessage, errorMessage),
      );
    }
    const updatedFields: Partial<User> = {};

    if (updateUserDto.first_name) {
      updatedFields.first_name = updateUserDto.first_name;
    }
    if (updateUserDto.last_name) {
      updatedFields.last_name = updateUserDto.last_name;
    }
    if (updateUserDto.email) {
      if (updateUserDto.email !== user.email) {
        const existingUser = await this.userRepository.findOne({
          where: { email: updateUserDto.email },
        });
        if (existingUser) {
          throw new ConflictException(errorMessages.invalidInput);
        }
      }
      updatedFields.email = updateUserDto.email;
    }
    await this.userRepository.update(id, updatedFields);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return this.formatResponse(userMessages.userUpdate, {
      id: updatedUser.id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  }

  // User delete account
  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      const errorMessage = errorMessages.userNotFound;
      throw new BadRequestException(
        this.formatResponse(errorMessage, errorMessage),
      );
    }
    await this.userRepository.remove(user);
    return this.formatResponse(userMessages.userDelete, {});
  }

  // User update password
  async updatePassword(
    id: string,
    updatePassword: UpdatePasswordDto,
  ): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      const errorMessage = errorMessages.userNotFound;
      throw new BadRequestException(
        this.formatResponse(errorMessage, errorMessage),
      );
    }
    const hashedPassword = await bcrypt.hash(updatePassword.password, 10);
    user.password = hashedPassword;
    const update = await this.userRepository.save(user);
    return this.formatResponse(userMessages.passwordUpdate, {
      id: update.id,
      first_name: update.first_name,
      last_name: update.last_name,
      email: update.email,
      role: update.role,
    });
  }
}
