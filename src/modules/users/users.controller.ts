import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { PrivateUserResDto } from './dto/res/private-user.res.dto';
import { PublicUserResDto } from './dto/res/public-user.res.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<PrivateUserResDto> {
    return await this.usersService.create(createUserDto);
  }

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
  public async findMe(): Promise<PrivateUserResDto> {
    return await this.usersService.findMe();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch('me')
  public async updateMe(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<PrivateUserResDto> {
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

  @Get(':userId')
  public async findOne(
    @Param('userId') userId: string,
  ): Promise<PublicUserResDto> {
    return await this.usersService.findOne(+userId);
  }
}
