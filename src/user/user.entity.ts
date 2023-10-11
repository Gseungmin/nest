import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  constructor(user?: CreateUserDto) {
    if (user) {
      this.email = user.email;
      this.nickname = user.nickname;
      this.password = user.password;
    }
  }
}
