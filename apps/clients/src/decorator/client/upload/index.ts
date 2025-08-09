import { applyDecorators, Patch, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Swagger } from './swagger';

export function UploadPicture() {
  return applyDecorators(
    Patch(':id/profile-picture'),
    Swagger(),
    UseInterceptors(FileInterceptor('profile')),
  );
}
