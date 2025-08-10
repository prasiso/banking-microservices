import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
export class CreateTransactionDto {
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Campo id_client_send não aceita String' })
  @IsNotEmpty({ message: 'Campo remetente está vazio' })
  id_client_send: number;

  @ApiProperty({ example: 2 })
  @IsNumber({}, { message: 'Campo id_client_receiver não aceita String' })
  @IsNotEmpty({ message: 'Campo destinatário está vazio' })
  id_client_receiver: number;

  @ApiProperty({ example: 5 })
  @IsNumber({}, { message: 'Campo amount não aceita String' })
  @IsNotEmpty({ message: 'Campo Valor está vazio' })
  @Min(5, { message: 'Valor deve ser acima de 5 reais' })
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
