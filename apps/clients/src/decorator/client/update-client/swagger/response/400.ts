import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response400Client } from 'src/decorator/client/swagger';

export const ResponseUpdate400Client = () => {
  const response: any = {
    status: 400,
    description: 'Erro de validação',
    content: {
      'application/json': {
        examples: {
          emailObrigatorio: {
            summary: 'Email Inválido',
            value: {
              message: ['Não é um endereço de e-mail válido'],
            },
          },
          DataBankingIsntUse: {
            summary: 'Os dados bancários já estão em uso.',
            value: {
              message: ['A agência e a conta já estão em uso'],
            },
          },
          IdNotValid: {
            summary: 'Id inválido',
            value: {
              message: ['Parâmetro id enviado não é valido']
            }
          }
        },
      },
    },
  };
  const opt: (MethodDecorator | ClassDecorator)[] = [ApiResponse(response)];
  return applyDecorators(...opt);
};
