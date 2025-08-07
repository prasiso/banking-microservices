import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Procurar usuário',
      description: 'Encontrar o usuário por id',
    }),
    ResponseSwagger(),
  );
};
