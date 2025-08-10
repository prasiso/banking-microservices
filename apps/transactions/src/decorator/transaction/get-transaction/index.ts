import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export const getTransaction = () => {
  return applyDecorators(Get(':id'), Swagger());
};
