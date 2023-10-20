import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostImage } from 'src/post-image/entities/post-image.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private dataSource: Repository<Post>,
  ) {}

  async create(
    post: Partial<Post>,
    postImage: Array<{ post: Post; url: string }>,
  ): Promise<Post> {
    return await this.dataSource.manager.transaction(
      async (entityManager: EntityManager) => {
        const newPost = await entityManager.save(Post, post);

        postImage.forEach((image) => {
          image.post = newPost;
        });

        await entityManager
          .createQueryBuilder()
          .insert()
          .into(PostImage)
          .values(postImage)
          .execute();

        return newPost;
      },
    );
  }

  async findAll(): Promise<Post[]> {
    return await this.dataSource.find();
  }

  async findById(id: string): Promise<Post | null> {
    return await this.dataSource.findOneBy({ id });
  }

  async update(id: string, postDto: Partial<Post>): Promise<Post | null> {
    await this.dataSource.update(id, postDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }
}
