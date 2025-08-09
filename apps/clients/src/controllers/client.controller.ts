import { Body, Controller, Param, UploadedFile } from '@nestjs/common';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiTags } from '@nestjs/swagger';
import { getClient } from 'src/decorator/client';
import { updateClient } from 'src/decorator/client/update-client';
import { UploadPicture } from 'src/decorator/client/upload';
import { updateClientDto } from 'src/dtos';
import { ClientService } from 'src/services';
@Controller('client')
@ApiTags('Cliente')
export class ClientController {
  constructor(private readonly client_service: ClientService) { }
  @getClient()
  getUser(@Param('id') id: string) {
    return this.client_service.get_one(+id, {
      include: {
        banking: true,
      },
    });
  }
  @updateClient()
  updateClient(@Param('id') id: string, @Body() body: updateClientDto) {
    return this.client_service.update_client(+id, body);
  }
  @UploadPicture()
  async UploadPicture(@UploadedFile() document: any, @Param('id') id: string) {
    return await this.client_service.upload_file(document, +id)
  }
}
