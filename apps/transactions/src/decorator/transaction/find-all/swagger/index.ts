import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Pegar toda as transferência por cliente',
      description: 'Pegar toda as transferência por cliente',
    }),
    ResponseSwagger(),
  );
};
