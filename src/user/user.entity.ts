import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { CommonEntity } from 'src/common/entities/common.entity';
import { USER_GRADE } from 'src/common/utils';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts: Promise<Post[]>;

  constructor(user?: CreateUserDto) {
    super();
    if (user) {
      this.email = user.email;
      this.nickname = user.nickname;
      this.password = user.password;
      this.role = USER_GRADE.BASIC;
    }
  }
}
