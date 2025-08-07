import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ResponseGetOneUser = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: ResponseGetOneUserDto,
    }),
  );
};

import { ApiProperty } from '@nestjs/swagger';

class BankingDto {
  @ApiProperty({ example: 1 })
  id_banking: number;

  @ApiProperty({ example: '0023' })
  agency: string;

  @ApiProperty({ example: '234567-8' })
  account: string;
}

class ResponseGetOneUserDto {
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
