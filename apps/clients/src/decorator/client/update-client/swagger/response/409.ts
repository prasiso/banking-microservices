import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/common/decorator/swagger';

export const Response409UpdateClient = () => {
  return applyDecorators(
    ApiResponse({
      status: 409,
      type: Response409UpdateClientDto,
    }),
  );
};
class Response409UpdateClientDto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: 'Este e-mail já está em uso.',
    description: 'Descrição de erro',
  })
  message: string;
  @ApiProperty({
    example: 409,
    description: 'Status da response',
  })
  status: number;
}
