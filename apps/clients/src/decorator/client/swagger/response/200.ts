import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export const Response200Client = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: Response200ClientDto,
    }),
  );
};


class BankingDto {
  @ApiProperty({ example: 1 })
  id_banking: number;

  @ApiProperty({ example: '0023' })
  agency: string;

  @ApiProperty({ example: '234567-8' })
  account: string;
}

class Response200ClientDto {
  @ApiProperty({ example: 1 })
  id_client: number;

  @ApiProperty({ example: 'Maria Oliveira' })
  name: string;

  @ApiProperty({ example: 'maria.oliveira@example.com' })
  email: string;

  @ApiProperty({ example: 'Avenida Central, 456' })
  address: string;

  @ApiProperty({ example: null, nullable: true })
  profile_picture: string | null;

  @ApiProperty({ example: '2025-08-07T00:00:00.000Z' })
  created_at: string;

  @ApiProperty({ example: '2025-08-07T00:00:00.000Z' })
  updated_at: string;

  @ApiProperty({ example: 1 })
  id_banking: number;

  @ApiProperty({ type: () => BankingDto })
  banking: BankingDto;
}
