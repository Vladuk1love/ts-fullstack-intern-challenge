import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { Like } from 'src/entities/likes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Like]),  
    JwtModule.register({
      secret: 'developed_by_yurtaev', // здесь могла быть ваша реклама
      signOptions: {
        expiresIn: '3d'
      }
    })
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
