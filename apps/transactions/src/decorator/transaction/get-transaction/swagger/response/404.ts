import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/common/decorator/swagger';

export const Response404GetOneTransaction = () => {
  return applyDecorators(
    ApiResponse({
      status: 404,
      type: Response404GetOneTransactionDto,
    }),
  );
};
class Response404GetOneTransactionDto extends ResponseErroGlobalSwagger {
  @ApiProperty({ example: 'Transferência não encontrado' })
  message: string;
  @ApiProperty({ example: 404 })
  status: number
}
