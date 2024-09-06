import { Controller, HttpCode, UsePipes, ValidationPipe, Post, Body } from '@nestjs/common';
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
}

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }