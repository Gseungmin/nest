import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}

  async create(post: Partial<Post>): Promise<Post> {
    const newPost = this.repository.create(post);
    return await this.repository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Post | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: string, postDto: Partial<Post>): Promise<Post | null> {
    await this.repository.update(id, postDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
