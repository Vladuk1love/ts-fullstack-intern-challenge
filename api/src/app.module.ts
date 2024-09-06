import { Module } from '@nestjs/common';
import { LikesController } from './likes/likes.controller';
import { LikesService } from './likes/likes.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users/users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'cat-pinterest-api-pg',
      port: 5432,
      username: 'postgres',
      password: 'pass',
      database: 'support_lk_db',
      // url: "postgres://postgres:1@db-endpoint:5432/support_lk_db",
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule
  ]
})
export class AppModule {}
