import {
  Controller,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Post,
  Get,
  Headers,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserAuthDto } from './dto/user.auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/register')
  async register(@Body() dto: UserAuthDto) {
    return this.usersService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: UserAuthDto) {
    return this.usersService.login(dto);
  }

  @HttpCode(200)
  @Get('/getMe')
  async getUserProfile(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'Токен не существует',
      });
    }
    const token = authHeader.split(' ')[1];
    return this.usersService.getMe(token);
  }
}

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
