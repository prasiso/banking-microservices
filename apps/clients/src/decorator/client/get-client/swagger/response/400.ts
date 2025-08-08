import { applyDecorators } from '@nestjs/common';
import { Response400Client } from 'src/decorator/client/swagger';

export const ResponseBadRequestClient = () => {
  return applyDecorators(Response400Client());
};
