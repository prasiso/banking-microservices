import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/common/decorator/swagger';

export const Response400GetOneTransaction = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      type: Response400GetOneTransactionDto,
    }),
  );
};
class Response400GetOneTransactionDto extends ResponseErroGlobalSwagger {
  @ApiProperty({ example: 'Parametro id enviado não é valido' })
  message: string;
  @ApiProperty({ example: 400 })
  status: number;
}
