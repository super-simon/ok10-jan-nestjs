import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ArticleListQueryDto } from './dto/req/article-list.query.dto';
import { CreateArticleDto } from './dto/req/create-article.req.dto';
import { UpdateArticleDto } from './dto/req/update-article.req.dto';
import { ArticleListResDto } from './dto/res/article-list.res.dto';
import { ArticleResDto } from './dto/res/article.res.dto';
import { ArticleMapper } from './services/article.mapper';
import { ArticleService } from './services/article.service';

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: ArticleListQueryDto,
  ): Promise<ArticleListResDto> {
    const [entities, total] = await this.articleService.getList(
      userData,
      query,
    );
    return ArticleMapper.toResponseListDTO(entities, total, query);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  public async create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.create(userData, createArticleDto);
    return ArticleMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Patch(':articleId')
  public async update(
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @CurrentUser() userData: IUserData,
  ): Promise<string> {
    return this.articleService.update(userData, articleId, updateArticleDto);
  }
}
