import { AwsService } from 'src/common/aws.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { ERRORS } from 'src/common/utils';
import { PostImage } from 'src/post-image/entities/post-image.entity';
@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly awsService: AwsService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    user: User,
    images: Express.Multer.File[],
  ) {
    const uploadedFiles = await Promise.all(
      images.map((image) => this.awsService.uploadFileToS3('post', image)),
    );

    const post = new Post(createPostDto);
    post.setUser(user);

    const postImages = uploadedFiles.map((file) => {
      const url = this.awsService.getAwsS3FileUrl(file.key);
      const image = new PostImage(url);
      image.setPost(post);
      return {
        post: image.post,
        url: image.url,
      };
    });

    return await this.postRepository.create(post, postImages);
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
