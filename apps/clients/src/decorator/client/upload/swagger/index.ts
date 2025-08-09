import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar foto de perfil',
      description: 'Atualizar foto de perfil',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          profile: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ResponseSwagger(),
  );
};
