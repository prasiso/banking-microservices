import { applyDecorators, Patch } from '@nestjs/common';
import { Swagger } from './swagger';

export const updateClient = () => {
  return applyDecorators(Patch(':id'), Swagger());
};
