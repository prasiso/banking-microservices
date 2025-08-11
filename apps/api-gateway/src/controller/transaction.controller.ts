import { All, Controller, Injectable, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { ProxyService } from 'src/service/proxy.service';

@Controller('transaction')
@ApiExcludeController()
export class TransactionProxyController {
  constructor(private readonly proxy: ProxyService) {}
  @All('*')
  async all(@Req() req: Request) {
    return await this.proxy.proxy('transaction', req);
  }
}
