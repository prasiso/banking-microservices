import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const Response400UploadClient = () => {
  const response: any = {
    status: 400,
    description: 'Erro de validação',
    content: {
      'application/json': {
        examples: {
          IdNotValid: {
            summary: 'Id inválido',
            value: {
              message: ['Parâmetro id enviado não é valido'],
            },
          },
          NotPossibleUploadPicture: {
            summary: 'Não foi possível atualizar a foto de perfil',
            value: {
              message: [
                'Não foi possível atualizar a foto de perfil, favor contactar suporte',
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
