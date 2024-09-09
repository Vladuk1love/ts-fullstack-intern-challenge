import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { HttpModule } from '@nestjs/axios';
import { User } from 'src/entities/users.entity';
import { Like } from 'src/entities/likes.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
      TypeOrmModule.forFeature([User,Like]),  
      HttpModule,
      UsersModule,
      JwtModule.register({
        secret: 'developed_by_yurtaev',
        signOptions: { expiresIn: '3d' }
      })
  
    ],
    providers: [CatsService],
    controllers: [CatsController],
    exports: [CatsService],
  })

export class CatsModule {}
