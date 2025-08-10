import { applyDecorators } from '@nestjs/common';
import { ResponseGlobalSwagger } from 'src/common/decorator/swagger';
import { ResponseGetOneTransaction } from './200';
import { Response400GetOneTransaction } from './400';
import { Response404GetOneTransaction } from './404';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(),
    ResponseGetOneTransaction(),
    Response400GetOneTransaction(),
    Response404GetOneTransaction()
  );
};
