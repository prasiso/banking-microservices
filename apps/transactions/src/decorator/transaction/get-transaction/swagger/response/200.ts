import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { Response200Client } from 'src/decorator/client/swagger';

export const ResponseGetOneTransaction = () => {
  return applyDecorators(
    ApiResponse({
      type: Response200GetOneTransactionDto,
      status: 200,
    }),
  );
};

// UTILIZADO IA PARA GERAR O DTO
class ClientDto {
  @ApiProperty({ example: 1, description: 'Identificador único do cliente' })
  id_client: number;

  @ApiProperty({
    example: 'Maria Oliveira',
    description: 'Nome completo do cliente',
  })
  name: string;
}

export class Response200GetOneTransactionDto {
  @ApiProperty({
    description: 'Identificador único da transação',
    example: 16,
  })
  id_transaction: number;

  @ApiProperty({
    description: 'Identificador do cliente que enviou',
    example: 1,
  })
  id_client_send: number;

  @ApiProperty({
    description: 'Identificador do cliente que recebeu',
    example: 2,
  })
  id_client_receiver: number;

  @ApiProperty({
    description: 'Status atual da transação',
    example: 'PENDING',
  })
  status: string;

  @ApiProperty({
    description: 'Valor da transação',
    example: 5,
  })
  amount: number;

  @ApiProperty({
    description: 'Descrição da transação',
    example: 'Teste',
  })
  description: string;

  @ApiProperty({
    description: 'Data e hora de criação da transação',
    example: '2025-08-09T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  created_at: string;

  @ApiProperty({
    description: 'Data e hora da última atualização da transação',
    example: '2025-08-09T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updated_at: string;

  @ApiProperty({
    description: 'Informações do cliente que enviou',
    type: ClientDto,
  })
  @Type(() => ClientDto)
  send: ClientDto;

  @ApiProperty({
    description: 'Informações do cliente que recebeu',
    type: ClientDto,
  })
  @Type(() => ClientDto)
  receiver: ClientDto;
}
