import { applyDecorators, Post } from '@nestjs/common';
import { Swagger } from './swagger';

export const CreateTransaction = () => {
  return applyDecorators(Post(), Swagger());
};
