import { CreateUserDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async save(userDto: CreateUserDto) {
    const findUser = await this.userRepository.findByEmail(userDto.email);

    if (findUser) {
      console.log('이미 존재하는 아이디 입니다.');
      return null;
    }

    const user = new User(userDto);
    return await this.userRepository.create(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }
}
