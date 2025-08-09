import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response404Client } from 'src/decorator/client/swagger';

export const Response404UploadClient = () => {
  const response: any = {
    status: 404,
    description: 'Erro de validação',
    content: {
      'application/json': {
        examples: {
          IdNotValid: {
            summary: 'Cliente não encontrado',
            value: {
              message: ['Cliente não encontrado'],
            },
          },
          NotPossibleUploadPicture: {
            summary: 'Não foi enviado arquivo',
            value: {
              message: ['Não foi enviado arquivo'],
            },
          },
        },
      },
    },
  };
  const opt: (MethodDecorator | ClassDecorator)[] = [ApiResponse(response)];
  return applyDecorators(...opt);
};
