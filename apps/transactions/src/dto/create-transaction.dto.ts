import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Campo remetente vazio' })
  id_client_send: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Campo destinatário vazio' })
  id_client_receiver: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Valor vazio' })
  @Min(5, { message: 'Valor deve ser acima de 5 reais' })
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
