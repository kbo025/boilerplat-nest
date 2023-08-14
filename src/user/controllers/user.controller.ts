import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UserController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto) {
    return { dto };
  }

  @Get()
  list(
    @Query('page', ParseIntPipe) page = 1,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage = 100,
    @Query('filters') filters: object,
  ) {
    return { page, itemsPerPage, filters };
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return { id, dto };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
