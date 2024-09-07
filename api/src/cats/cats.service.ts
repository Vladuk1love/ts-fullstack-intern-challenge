import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/entities/likes.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Like) private readonly likesRepository: Repository<Like>,
  ) {}

  async checkLikes(
    userId: number,
    imageIds: string[],
  ): Promise<Record<string, boolean>> {

    const likes = await this.likesRepository.find({
      where: { user: { id: userId }, imageID: In(imageIds) },
    });

    const likedMap: Record<string, boolean> = {};

    imageIds.forEach((id) => {
      likedMap[id] = !!likes.find((like) => like.imageID === id);
    });

    return likedMap;
  }

  // getCats(): string {
  //   return 'This method returns all cats';
  // }
}
