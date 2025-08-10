import { applyDecorators } from '@nestjs/common';
import { ResponseGlobalSwagger } from 'src/common/decorator/swagger';
import { Response200ListTransaction } from './200';
import { Response404CreateTransaction } from './404';
import { Response400CreateTransaction } from './400';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(),
    Response200ListTransaction(),
    Response404CreateTransaction(),
    Response400CreateTransaction(),
  );
};
