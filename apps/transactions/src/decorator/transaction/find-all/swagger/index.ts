import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Criar Transferência',
      description: 'Criar transferência',
    }),
    ResponseSwagger(),
  );
};
