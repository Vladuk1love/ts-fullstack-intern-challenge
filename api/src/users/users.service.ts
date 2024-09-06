import {
  BadRequestException,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserAuthDto } from './dto/user.auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepos: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: UserAuthDto): Promise<{ accessToken: string }> {
    const { name, email, password } = dto;

    // проверяю, занят ли логин(email)
    const isUserExist = await this.userRepos.findOne({
      where: { email },
    });
    if (isUserExist) {
      throw new BadRequestException({
        message: 'Пользователь с таким email уже существует',
      });
    }

    const salt = await bcrypt.genSalt(256);
    const hashPass = await bcrypt.hash(password, salt);

    const user = await this.userRepos.create({
      name,
      email,
      password: hashPass,
    });

    await this.userRepos.save(user);

    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });

    return { accessToken };
  }

  async login(dto: UserAuthDto): Promise<{ accessToken: string }> {
    const { email, password } = dto;

    const user = await this.userRepos.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Неверный логин или пароль',
      });
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Неверный логин или пароль',
      });
    }

    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
