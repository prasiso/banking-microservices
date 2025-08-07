import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export const ResponseGlobalSwagger = (e500 = true, e401 = true) => {
  const opt: (MethodDecorator | ClassDecorator)[] = [];
  if (e500)
    opt.push(
      ApiResponse({
        status: 500,
        description: 'Oops! Erro, favor entrar em contato com suporte !',
      }),
    );
  if (e401)
    opt.push(ApiResponse({ status: 401, description: 'Não autorizado!' }));

  return applyDecorators(...opt);
};
