import { applyDecorators } from '@nestjs/common';
import { Response404Client } from 'src/decorator/client/swagger';

export const Response404UpdateClient = () => {
  return applyDecorators(Response404Client());
};
