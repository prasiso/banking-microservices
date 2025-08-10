import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const Response400CreateTransaction = () => {
  const response: any = {
    status: 400,
    description: 'Não encontrado',
    content: {
      'application/json': {
        examples: {
          receiverNotFound: {
            summary: 'Remetente e destinatário devem ser diferentes',
            value: {
              message: 'Remetente e destinatário devem ser diferentes.',
            },
          },
          ValueMin: {
            summary: 'Valor mínimo',
            value: {
              message: ['Valor deve ser acima de 5 reais']
            }
          },
          notFoundSender: {
            summary: 'Não foi encontrado remetente',
            value: {
              message: ['Campo remetente está vazio']
            }
          },
          notFoundRecipient: {
            summary: 'Não foi encontrado destinatário',
            value: {
              message: ['Campo destinatário está vazio']
            }
          },
          IsNumber: {
            summary: 'Campo deve ser número',
            value: {
              message: ['Campo ${campo} não aceita String'],
            },
          }
        },
      },
    },
  };
  const opt: (MethodDecorator | ClassDecorator)[] = [ApiResponse(response)];
  return applyDecorators(...opt);
};
