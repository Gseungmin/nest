import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { AwsService } from 'src/common/aws.service';
import { PostImageModule } from 'src/post-image/post-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), PostImageModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, AwsService],
})
export class PostModule {}
