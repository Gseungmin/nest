import { CommonEntity } from 'src/common/entities/common.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { PostImage } from './post-image.entity';

@Entity()
export class Post extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @OneToMany(() => PostImage, (postImage) => postImage.post, {
    cascade: true,
  })
  images: Promise<PostImage[]>;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  constructor(post?: CreatePostDto) {
    super();
    if (post) {
      this.title = post.title;
      this.content = post.content;
    }
  }

  async setUser(user: User) {
    this.user = user;
  }
}
