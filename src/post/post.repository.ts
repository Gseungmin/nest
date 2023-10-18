import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostImage } from 'src/post-image/entities/post-image.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}

  async createWithImages(post: Post, images: PostImage[]): Promise<Post> {
    await this.repository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(Post, post);
        await transactionalEntityManager.save(PostImage, images);
      },
    );

    return post;
  }

  async create(
    post: Partial<Post>,
    postImage: Array<{ post: Post; url: string }>,
  ): Promise<Post> {
    const newPost = await this.repository.save(this.repository.create(post));

    for (const image of postImage) {
      image.post = newPost;
    }

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(PostImage)
      .values(postImage)
      .execute();
    return newPost;
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
