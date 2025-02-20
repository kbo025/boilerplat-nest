import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';

type Payload = {
  email: string;
  name: string;
};

export default class DeleteTesteUseCase
  extends BaseUseCase
  implements IUseCase
{
  async execute(payload: Payload): Promise<any> {
    console.log('called use case');
    console.log(payload);
  }
}
