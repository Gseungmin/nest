import { ERRORS } from 'src/common/utils';
import { CreateUserDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async save(userDto: CreateUserDto) {
    const findUser = await this.userRepository.findByEmail(userDto.email);

    if (findUser) {
      throw new HttpException(
        ERRORS.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User(userDto);
    return await this.userRepository.create(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }
}
