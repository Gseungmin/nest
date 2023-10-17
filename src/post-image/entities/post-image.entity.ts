import { CommonEntity } from 'src/common/entities/common.entity';
import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class PostImage extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  url: string;

  @ManyToOne(() => Post, (post) => post.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: Post;

  constructor(url?: string) {
    super();
    if (url) {
      this.url = url;
    }
  }

  async setPost(post: Post) {
    this.post = post;
  }
}
