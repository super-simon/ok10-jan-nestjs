import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log(updatePostDto);
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
