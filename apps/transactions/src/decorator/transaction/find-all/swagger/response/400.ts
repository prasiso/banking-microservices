import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const Response400CreateTransaction = () => {
  const response: any = {
    status: 400,
    description: 'Informações erradas',
    content: {
      'application/json': {
        examples: {
          PageNotSend: {
            summary: 'Page não enviado',
            value: {
              message: ['Page não enviado'],
            },
          },
          LimitNotSend: {
            summary: 'Limite não enviado',
            value: {
              message: ['Limite não enviado'],
            },
          },
          NotSendEqualType: {
            summary: 'Os tipos não são compatível',
            value: {
              message: ['Os tipos devem ser SEND ou RECEIVER'],
            },
          },
          NotSendEqualStatus: {
            summary: 'Status não compatível',
            value: {
              message: ['Status deve ser PENDING ou NO_BALANCE ou COMPLETED'],
            },
          },
          NotSendEqualOperational: {
            summary: 'Operacional não compatíveis',
            value: {
              message: ['Os tipos devem ser OR ou AND'],
            },
          },
          sendInvalidId: {
            summary: 'Id é inválido',
            value: {
              message: ['Parametro id enviado não é valido'],
            },
          },
          sameId: {
            summary: 'Id enviado iguais',
            value: {
              message: [
                'O ID de pesquisa de outro cliente não pode ser igual ao ID do próprio cliente.',
              ],
            },
          },
        },
      },
    },
  };
  const opt: (MethodDecorator | ClassDecorator)[] = [ApiResponse(response)];
  return applyDecorators(...opt);
};
