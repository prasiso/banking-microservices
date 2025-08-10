import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ToDate, ToNumber } from 'src/common/decorator';
import { typeOperational, typeTransaction } from 'src/common/enums';

export class FindAllTransactionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Page não enviado' })
  @ToNumber()
  page: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Limite não enviado' })
  @ToNumber()
  limit: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @ToNumber()
  id_another_client?: number;

  @ApiProperty({ required: false })
  @IsEnum(typeTransaction, { message: 'Os tipos devem ser SEND ou RECEIVER' })
  @IsOptional()
  type?: 'SEND' | 'RECEIVER';

  @ApiProperty({ required: false })
  @IsOptional()
  @ToNumber()
  valueMin?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Status, {
    message: 'Status deve ser PENDING ou NO_BALANCE ou COMPLETED',
  })
  status?: Status;

  @ApiProperty({ required: false })
  @IsOptional()
  @ToNumber()
  valueMax?: number;

  @ApiProperty({ required: false })
  @ToDate()
  @IsOptional()
  DateMin?: string;

  @ApiProperty({ required: false })
  @ToDate()
  @IsOptional()
  DateMax?: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => (value === 'OR' ? 'OR' : 'AND'))
  @IsEnum(typeOperational, { message: 'Os tipos devem ser OR ou AND' })
  @IsOptional()
  operational?: 'OR' | 'AND';

  @ApiProperty({ type: String, required: false })
  @Transform(({ value }) => {
    if (!value) return undefined;
    const [field, order] = value?.split('-');
    return { [field]: order };
  })
  order?: any;
}
