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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
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

  @ApiCreatedResponse({ type: PrivateUserResDto })
  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  public async findAll(): Promise<any> {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: PrivateUserResDto })
  @Get('me')
  public async findMe(): Promise<any> {
    return await this.usersService.findMe();
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: PrivateUserResDto })
  @Patch('me')
  public async updateMe(@Body() updateUserDto: UpdateUserDto): Promise<any> {
    return await this.usersService.updateMe(updateUserDto);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'User has been removed' })
  @Delete('me')
  public async removeMe(): Promise<any> {
    return await this.usersService.removeMe();
  }

  @ApiOkResponse({ type: PublicUserResDto })
  @Get(':userId')
  public async findOne(@Param('userId') userId: string): Promise<any> {
    return await this.usersService.findOne(+userId);
  }
}
