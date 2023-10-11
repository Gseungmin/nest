import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  constructor(user?: CreateUserDto) {
    super();
    if (user) {
      this.email = user.email;
      this.nickname = user.nickname;
      this.password = user.password;
    }
  }
}
