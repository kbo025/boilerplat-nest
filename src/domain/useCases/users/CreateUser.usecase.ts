import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';

type Payload = {
  email: string;
  name: string;
  password: string;
};

export class CreateUserUseCase extends BaseUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {
    super();
  }

  async execute(payload: Payload): Promise<any> {
    const response = await this.userRepository.createUser(payload);
    return response;
  }
}
