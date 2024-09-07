// src/cats/cats.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CatsService } from './cats.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly httpService: HttpService,
    private readonly catsSercive: CatsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('images')
  async getImagesWithLikes(@Req() request: Request) {
    const user = request['user'];

    const response = await this.httpService
      .get('https://api.thecatapi.com/v1/images/search?limit=10')
      .toPromise();

    const images = response.data;
    const imageIds = images.map((image) => image.id);

    // Чекаем, каких котиков лайкнул пользователь
    const likedMap = await this.catsSercive.checkLikes(user.id, imageIds);

    const imagesWithLikes = images.map((image) => ({
      ...image,
      liked: likedMap[image.id] || false,
    }));

    return imagesWithLikes;
  }
}
