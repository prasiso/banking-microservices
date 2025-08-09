import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export const Response200UploadFile = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: Response200UploadFileDto,
    }),
  );
};

class Response200UploadFileDto {
  @ApiProperty({ example: 'https://www.google.com' })
  link: string;
}
