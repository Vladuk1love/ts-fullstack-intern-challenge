import { Controller, Get } from '@nestjs/common';
import { LikesService } from './likes.service';



@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  
  @Get()
  getLikes(): string {
    return this.likesService.getHello();
  }
}
