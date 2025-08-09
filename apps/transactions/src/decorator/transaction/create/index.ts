import { applyDecorators, Post } from '@nestjs/common';

export const CreateTransaction = () => {
  return applyDecorators(Post());
};
