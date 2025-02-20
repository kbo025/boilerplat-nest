import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';

type Payload = {
  id: number;
};

export class GetUserUseCase extends BaseUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {
    super();
  }

  async execute(payload: Payload): Promise<any> {
    const { id } = payload;
    const response = await this.userRepository.findUser(id);
    return response;
  }
}
