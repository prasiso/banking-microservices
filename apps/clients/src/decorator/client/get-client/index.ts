import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export const getUser = () => {
  return applyDecorators(Get(':id'), Swagger());
};
