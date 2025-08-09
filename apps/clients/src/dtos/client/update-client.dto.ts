import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
class bankingDto {
  @ApiProperty()
  @IsString()
  agency?: string;

  @ApiProperty()
  @IsString()
  account?: string;
}
export class updateClientDto {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Não é um endereço de e-mail válido' })
  email?: string;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty({ type: bankingDto })
  @IsObject()
  @IsOptional()
  @ValidateNested({ context: true })
  @Type(() => bankingDto)
  banking?: bankingDto;
}
