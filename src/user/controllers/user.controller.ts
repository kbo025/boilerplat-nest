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
import { UsersService } from '../services/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const response = await this.usersService.createUser(dto);
    return response;
  }

  @Get()
  async list(
    @Query('page', ParseIntPipe) page = 1,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage = 100,
    @Query('filters') filters: object,
  ) {
    const response = await this.usersService.listUsers(
      page,
      itemsPerPage,
      filters,
    );
    return response;
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const response = await this.usersService.getUser(id);
    return response;
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const response = await this.usersService.updateUser(id, dto);
    return response;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    const response = await this.usersService.deleteUser(id);
    return response;
  }
}
