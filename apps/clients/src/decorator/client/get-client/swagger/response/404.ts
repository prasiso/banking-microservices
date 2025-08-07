import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ResponseNotFoundClient = () => {
  return applyDecorators(
    ApiResponse({
      status: 404,
      description: 'Cliente não encontrado',
    }),
  );
};
