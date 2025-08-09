import { Module } from '@nestjs/common';
import { AwsS3Service } from 'src/services';

@Module({
  providers: [AwsS3Service],
  exports: [AwsS3Service],
})
export class AwsModule {}
