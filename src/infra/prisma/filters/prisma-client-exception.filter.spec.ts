import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';

import { HttpAdapterHost } from '@nestjs/core';

describe('PrismaClientExceptionFilter', () => {
  it('should be defined', () => {
    const httpAdapterHost = { httpAdapter: {} } as HttpAdapterHost;
    expect(new PrismaClientExceptionFilter(httpAdapterHost)).toBeDefined();
  });
});
