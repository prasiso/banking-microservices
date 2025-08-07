import { applyDecorators } from '@nestjs/common';
import { ResponseGlobalSwagger } from 'src/common/decorator/swagger/response-global-swagger';
import { ResponseGetOneUser } from './200';
import { ResponseNotFoundClient } from './404';
import { ResponseBadRequestClient } from './400';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(),
    ResponseGetOneUser(),
    ResponseBadRequestClient(),
    ResponseNotFoundClient()
  );
};
