import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';

type Payload = {
  id: number;
  email: string;
  name: string;
  password: string;
};

export class UpdateUserUseCase extends BaseUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {
    super();
  }

  async execute(payload: Partial<Payload>): Promise<any> {
    const { id, ...data } = payload;
    const response = await this.userRepository.updateUser(id, data);
    return response;
  }
}
