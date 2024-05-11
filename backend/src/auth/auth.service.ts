import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user/entitity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { errorMessages, userMessages } from 'src/shared/constant/constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  private formatResponse(message: string, data: any) {
    return { message, data };
  }
  // User Login
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      const errorMessage = errorMessages.invalidEmail;
      throw new UnauthorizedException(
        this.formatResponse(errorMessage, errorMessage),
      );
    }
    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!passwordMatch || !user) {
      const errorMessage = errorMessages.invalidPassword;
      throw new UnauthorizedException(
        this.formatResponse(errorMessage, errorMessage),
      );
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return this.formatResponse(userMessages.userAuthenticated, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      token,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    const errorMessage = errorMessages.invalidAuth;
    throw new UnauthorizedException(
      this.formatResponse(errorMessage, errorMessage),
    );
  }
}
