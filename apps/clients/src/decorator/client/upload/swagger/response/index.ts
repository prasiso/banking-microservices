import { applyDecorators } from '@nestjs/common';
import { ResponseGlobalSwagger } from 'src/common/decorator/swagger';
import { Response200UploadFile } from './200';
import { Response404UploadClient } from './404';
import { Response400UploadClient } from './400';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(),
    Response200UploadFile(),
    Response400UploadClient(),
    Response404UploadClient(),
  );
};
