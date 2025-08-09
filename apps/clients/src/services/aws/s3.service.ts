import * as AWS from 'aws-sdk';

export class AwsS3Service {
  private s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET,
      region: process.env.AWS_S3_REGION,
    });
  }
  async upload_file(
    bucketName: string,
    key: string,
    file: Buffer,
    contentType?: string,
  ): Promise<any> {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: contentType ? contentType : undefined,
        ACL: 'public-read',
      };
      await this.s3.putObject(params).promise();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async get_signed_url(bucketName: string, key: string) {
    try {
      const params: AWS.S3.GetObjectRequest = {
        Bucket: bucketName,
        Key: key,
      };

      const url = await this.s3.getSignedUrlPromise('getObject', params);
      return url;
    } catch (error) {
      console.log(error);
      return null
    }
  }
}
