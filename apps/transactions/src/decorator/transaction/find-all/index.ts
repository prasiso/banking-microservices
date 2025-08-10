import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export const FindAllTransaction = () => {
  return applyDecorators(Get('all/:id'), Swagger());
};
