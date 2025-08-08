import { applyDecorators } from '@nestjs/common';
import { Response200Client } from 'src/decorator/client/swagger';

export const Response200UpdateClient = () => {
  return applyDecorators(Response200Client());
};

