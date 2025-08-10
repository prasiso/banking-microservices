import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';
import { typeTransaction } from 'src/common/enums';

export const Response200ListTransaction = () => {
  return applyDecorators(
    ApiResponse({
      description: 'Sucesso!',
      status: 200,
      type: Response200ListTransactionDto,
    }),
  );
};

class PaginationDto {
  @ApiProperty({
    description: 'Página atual da listagem',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Última página disponível',
    example: 1,
  })
  lastPage: number;

  @ApiProperty({
    description: 'Quantidade total de registros',
    example: 9,
  })
  totalQuantity: number;
}

class TransactionRowDto {
  @ApiProperty({
    description: 'Identificador único da transação',
    example: 25,
  })
  id_transaction: number;

  @ApiProperty({
    description: 'ID do cliente que enviou a transação',
    example: 2,
  })
  id_client_send: number;

  @ApiProperty({
    description: 'ID do cliente que recebeu a transação',
    example: 4,
  })
  id_client_receiver: number;

  @ApiProperty({
    description: 'Valor da transação',
    example: 50,
  })
  amount: number;

  @ApiProperty({
    description: 'Data de criação da transação',
    example: '2025-08-10T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  created_at: string;

  @ApiProperty({
    description: 'Status atual da transação',
    example: 'COMPLETED',
    type: 'string',
    enum: Status
  })
  status: Status;

  @ApiProperty({
    description: 'Data de última atualização da transação',
    example: '2025-08-10T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updated_at: string;

  @ApiProperty({
    description: 'Descrição da transação',
    example: 'Pagamento de serviço',
  })
  description: string;

  @ApiProperty({
    description: 'Tipo da transação',
    example: 'SEND',
    enum: typeTransaction,
    type: 'string',
  })
  type: string;
}

export class Response200ListTransactionDto {
  @ApiProperty({
    description: 'Informações de paginação',
    type: PaginationDto,
  })
  @Type(() => PaginationDto)
  pagination: PaginationDto;

  @ApiProperty({
    description: 'Quantidade total de registros encontrados',
    example: 9,
  })
  count: number;

  @ApiProperty({
    description: 'Lista de transações encontradas',
    type: TransactionRowDto,
    isArray: true,
  })
  @Type(() => TransactionRowDto)
  rows: TransactionRowDto[];
}