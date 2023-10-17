import { Module } from '@nestjs/common';
import { PostImageService } from './post-image.service';
import { PostImageController } from './post-image.controller';
import { PostImage } from './entities/post-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImageRepository } from './post-image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostImage])],
  controllers: [PostImageController],
  providers: [PostImageService, PostImageRepository],
  exports: [PostImageRepository],
})
export class PostImageModule {}
