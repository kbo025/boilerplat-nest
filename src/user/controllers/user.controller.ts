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
  Inject,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDto,
  FilterUserDto,
  QueryUserDto,
  UpdateUserDto,
  UserDto,
} from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { QueryResponse } from 'src/common/types/paginator/paginator.type';
import { IUserEntity } from '../entities/user.entity';
import { config } from 'src/config';
import { ConfigType } from '@nestjs/config';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decorators/public.decorator';

//@UseGuards(ApiKeyGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    const response = await this.usersService.createUser(dto);
    return response;
  }

  @Get('/teste')
  @HttpCode(HttpStatus.OK)
  async teste() {
    console.log(this.configService);
    const apiKey = this.configService.apiKey;
    return { apiKey };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(
    @Query() params: QueryUserDto,
  ): Promise<
    QueryResponse<IUserEntity, FilterUserDto> | QueryResponse<IUserEntity>
  > {
    const response = await this.usersService.list(params);
    return response;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
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
