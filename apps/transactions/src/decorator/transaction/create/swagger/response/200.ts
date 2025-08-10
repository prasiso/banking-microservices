import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export const Response200CreateTransaction = () => {
  return applyDecorators(
    ApiResponse({
      description: 'Sucesso!',
      status: 200,
      type: Reponse200CreateTransaction,
    }),
  );
};

class Reponse200CreateTransaction {
  @ApiProperty({ example: 20 })
  id_transaction: 20
  @ApiProperty({ example: 1 })
  id_client_send: 1
  @ApiProperty({ example: 2 })
  id_client_receiver: 2
  @ApiProperty({ example: 'PENDING' })
  status: 'PENDING'
  @ApiProperty({ example: 5 })
  amount: 5
  @ApiProperty({ example: 'string' })
  description: 'string'
  @ApiProperty({ example: '2025-08-10T00:00:00.000Z' })
  created_at: '2025-08-10T00:00:00.000Z'
  @ApiProperty({ example: '2025-08-10T00:00:00.000Z' })
  updated_at: '2025-08-10T00:00:00.000Z'
}
