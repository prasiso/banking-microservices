import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/common/decorator/swagger';

export const Response400Client = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      type: Response400ClientDto,
    }),
  );
};

class Response400ClientDto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: 'Parametro id enviado não é valido',
    description: 'Descrição de erro',
  })
  message: string;
  @ApiProperty({
    example: 401,
    description: 'Status da response',
  })
  status: number;
}
