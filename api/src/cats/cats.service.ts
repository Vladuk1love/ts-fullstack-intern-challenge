import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { Like } from 'src/entities/likes.entity';
import { User } from 'src/entities/users.entity';
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
    try {
      const likes = await this.likesRepository.find({
        where: { user: { id: userId }, imageID: In(imageIds) },
      });

      const likedMap: Record<string, boolean> = {};

      imageIds.forEach((id) => {
        likedMap[id] = !!likes.find((like) => like.imageID === id);
      });

      return likedMap;
    } catch (error) {
      console.log(error);
    }
  }

  // getCats(): string {
  //   return 'This method returns all cats';
  // }
  async getLikes(userId: number) {
    try {
      const likes = await this.likesRepository.find({
        where: { user: { id: userId } },
      });

      return likes;
    } catch (error) {
      console.log(error);
      throw new Error('Не удалось вернуть лайки');
    }
  }

  async putLike(userId: number, imageID: string, url: string): Promise<string> {
    try {
      const user = await this.likesRepository.manager.findOne(User, {
        where: { id: userId },
      });

      const newLike = this.likesRepository.create({
        user: user,
        imageID: imageID,
        url: url,
      });

      await this.likesRepository.save(newLike);

      return 'Теперь вам нравится этот котик!';
    } catch (error) {
      console.error(error);
      throw new Error('Не удалось поставить лайк');
    }
  }

  async deleteLike(userId: number, imageID: string): Promise<string> {
    try {
      const existingLike = await this.likesRepository.findOne({
        where: { user: { id: userId }, imageID: imageID },
      });

      if (!existingLike) {
        // If no like is found, return an error message
        return 'Не найден понравившийся котик';
      }

      await this.likesRepository.remove(existingLike).catch(e=>{
        console.log(e);
      });

      return 'Вам больше не нравится этот котик :(';
    } catch (error) {
      console.error(error);
      throw new Error('Не удалось удалить лайк');
    }
  }
}
