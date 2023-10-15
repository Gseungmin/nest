import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/user.entity';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { ERRORS } from 'src/common/utils';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto, user: User) {
    const post = new Post(createPostDto);
    await post.setUser(user);
    return await this.postRepository.create(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new HttpException(ERRORS.POST_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.remove(id);
  }
}
