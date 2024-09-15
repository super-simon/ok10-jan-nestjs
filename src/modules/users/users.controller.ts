import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UserMapper } from './user.mapper';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(): Promise<any> {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    const result = await this.usersService.findMe(userData);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch('me')
  public async updateMe(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResDto> {
    return await this.usersService.updateMe(updateUserDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiNoContentResponse({ description: 'User has been removed' })
  @Delete('me')
  public async removeMe(): Promise<void> {
    return await this.usersService.removeMe();
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResDto> {
    return await this.usersService.findOne(+userId);
  }
}
