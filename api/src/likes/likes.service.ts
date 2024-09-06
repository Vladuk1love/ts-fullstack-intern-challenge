import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesService {
  getHello(): string {
    return 'This method returns all likes';
  }
}
