import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/common/decorator/swagger';

export const Response404Client = () => {
  return applyDecorators(
    ApiResponse({
      status: 404,
      type: Response404UserDto,
    }),
  );
};

export class Response404UserDto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: 'Cliente não encontrado',
    description: 'Descrição de erro',
  })
  message: string;
  @ApiProperty({
    example: 404,
    description: 'Status da response',
  })
  status: number;
}
