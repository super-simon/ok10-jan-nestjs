import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AuthCacheService } from '../auth/services/auth-cache.service';
import { LoggerService } from '../logger/logger.service';
import { PostsService } from '../posts/posts.service';
import { RefreshTokenRepository } from '../repository/services/refresh-token.repository';
import { UserRepository } from '../repository/services/user.repository';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly postsService: PostsService,
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}

  public async findAll(): Promise<any> {
    return `This action returns all users`;
  }

  public async findOne(userId: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }
    return user;
  }

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  public async removeMe(userData: IUserData): Promise<any> {
    await this.userRepository.delete({ id: userData.userId });
    await this.authCacheService.deleteToken(userData.userId, userData.deviceId);
  }

  public async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
