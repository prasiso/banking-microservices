import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const Response404CreateTransaction = () => {
  const response: any = {
    status: 404,
    description: 'Não encontrado',
    content: {
      'application/json': {
        examples: {
          receiverNotFound: {
            summary: 'Destinatário não encontrado',
            value: {
              message: 'Não foi encontrado destinatário',
            },
          },
          sendNotFound: {
            summary: 'Remetente não encontrado',
            value: {
              message: 'Não foi encontrado remetente',
            },
          },
        },
      },
    },
  };
  const opt: (MethodDecorator | ClassDecorator)[] = [ApiResponse(response)];
  return applyDecorators(...opt);
};
