import { All, Controller, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { ProxyService } from 'src/service/proxy.service';

@Controller('Client')
@ApiExcludeController()
export class ClientProxyController {
  constructor(private readonly proxy: ProxyService) {}
  @All('*')
  async all(@Req() req: Request) {
    return this.proxy.proxy('client', req);
  }
}
