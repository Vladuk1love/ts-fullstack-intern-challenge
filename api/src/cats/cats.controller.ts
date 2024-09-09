// src/cats/cats.controller.ts
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  HttpCode,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CatsService } from './cats.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';
import { request } from 'http';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly httpService: HttpService,
    private readonly catsService: CatsService,
  ) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getImagesWithLikes(@Req() request: Request) {
    try {
      const user = request['user'];

      const response = await this.httpService
        .get('https://api.thecatapi.com/v1/images/search?limit=10')
        .toPromise();

      const images = response.data;
      const imageIds = images.map((image) => image.id);

      // Чекаем, каких котиков лайкнул пользователь
      const likedMap = await this.catsService.checkLikes(user.id, imageIds);

      const imagesWithLikes = images.map((image) => ({
        ...image,
        liked: likedMap[image.id] || false,
      }));

      return imagesWithLikes;
    } catch (err) {
      console.log(err);
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('/likes')
  async getLikes(@Req() request: Request) {
    try {
      const user = request['user'];
      // Чекаем, каких котиков лайкнул пользователь
      const likes = await this.catsService.getLikes(user.id);

      return likes;
    } catch (err) {
      console.log(err);
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/likes')
  async putLike(@Req() request: Request, @Body('imageID') imageID: string) {
    try {
      const user = request['user'];
      const response = await this.httpService
        .get(`https://api.thecatapi.com/v1/images/${imageID}`)
        .toPromise();
      const imageUrl = response.data.url;
      return await this.catsService
        .putLike(user.id, imageID, imageUrl)
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete('/likes') // ?imageID=${imageID}
  async unlikeCat(@Query('imageID') imageID: string, @Req() req: Request) {
    const userId = req['user'].id;
    return await this.catsService.deleteLike(userId, imageID);
  }
}
