import { applyDecorators } from '@nestjs/common';
import { ResponseGlobalSwagger } from 'src/common/decorator/swagger';
import { Response200UpdateClient } from './200';
import { Response404UpdateClient } from './404';
import { ResponseUpdate400Client } from './400';
import { Response409UpdateClient } from './409';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(),
    Response200UpdateClient(),
    ResponseUpdate400Client(),
    Response404UpdateClient(),
    Response409UpdateClient()
  );
};
