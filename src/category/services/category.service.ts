import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/category.dto';
import { UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService {
  create(slug: string, dto: CreateCategoryDto) {
    throw new Error('Method not implemented.');
  }
  list(slug: string, page: number, itemsPerPage: number, filters: object) {
    throw new Error('Method not implemented.');
  }
  get(slug: string, id: number, deep: number) {
    throw new Error('Method not implemented.');
  }
  update(slug: string, id: number, dto: UpdateCategoryDto) {
    throw new Error('Method not implemented.');
  }
  delete(slug: string, id: number) {
    throw new Error('Method not implemented.');
  }
}
