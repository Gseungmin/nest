import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostImage } from './entities/post-image.entity';

@Injectable()
export class PostImageRepository {
  constructor(
    @InjectRepository(PostImage)
    private repository: Repository<PostImage>,
  ) {}

  async create(post: Partial<PostImage>): Promise<PostImage> {
    const newImage = this.repository.create(post);
    return await this.repository.save(newImage);
  }
}
