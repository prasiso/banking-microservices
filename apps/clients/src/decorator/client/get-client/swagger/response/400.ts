import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ResponseBadRequestClient = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Parametro id enviado não é valido',
    }),
  );
};
