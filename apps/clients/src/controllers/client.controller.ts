import { Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/decorator/client';
import { ClientService } from 'src/services';
@Controller('client')
@ApiTags('Cliente')
export class ClientController {
  constructor(private readonly client_service: ClientService) { }
  @getUser()
  getUser(@Param('id') id: string) {
    return this.client_service.getOne(+id, {
      include: {
        banking: true
      }
    });
  }
}
