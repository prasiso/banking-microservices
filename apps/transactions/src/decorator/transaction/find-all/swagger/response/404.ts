import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const Response404CreateTransaction = () => {
  const response: any = {
    status: 404,
    description: 'Não encontrado',
    content: {
      'application/json': {
        examples: {
          ClientNotFound: {
            summary: 'Cliente não encontrado',
            value: {
              message: 'Cliente não encontrado',
            },
          },
          AnotherClientNotFound: {
            summary: 'Outro cliente não encontrado',
            value: {
              message: 'Outro cliente não encontrado',
            },
          },
        },
      },
    },
  };
  const opt: (MethodDecorator | ClassDecorator)[] = [ApiResponse(response)];
  return applyDecorators(...opt);
};
