import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';

export default class CreateTesteUseCase
  extends BaseUseCase
  implements IUseCase
{
  async execute(): Promise<any> {
    console.log('called use case');
  }
}
