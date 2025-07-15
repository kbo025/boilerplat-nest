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
} from '@nestjs/common';
import {
  CreateUserDto,
  FilterUserDto,
  QueryUserDto,
  UpdateUserDto,
  UserDto,
} from '../dtos/user.dto';
import { config } from 'src/config';
import { ConfigType } from '@nestjs/config';
// import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/infra/auth/decorators/public.decorator';
import { QueryResponse } from 'src/domain/common/paginator/paginator.type';
import { UsersService } from '../services/users.service';

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
    return await this.usersService.createUser(dto);
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
  ): Promise<QueryResponse<UserDto, FilterUserDto> | QueryResponse<UserDto>> {
    return await this.usersService.list(params);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUser(id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }
}
