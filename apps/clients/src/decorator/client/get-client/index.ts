import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export const getClient = () => {
  return applyDecorators(Get(':id'), Swagger());
};
