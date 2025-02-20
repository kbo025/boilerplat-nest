import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import {
  IQueryDto,
  QueryResponse,
} from 'src/domain/common/paginator/paginator.type';
import { IUserEntity, IUsersFilters } from 'src/domain/entities/IUser.entity';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';

export class ListUsersUseCase extends BaseUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {
    super();
  }

  async execute(
    payload: IQueryDto<IUsersFilters>,
  ): Promise<
    QueryResponse<IUserEntity, IUsersFilters> | QueryResponse<IUserEntity>
  > {
    const response = await this.userRepository.findAllUsers(payload);
    return response;
  }
}
