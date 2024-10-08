import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersController } from './users/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { CatsModule } from './cats/cats.module';
import { Like } from './entities/likes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'cat-pinterest-api-pg',
      port: 5432,
      username: 'postgres',
      password: 'pass',
      database: 'support_lk_db',
      entities: [User, Like],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    CatsModule,
  ],
})
export class AppModule {}
