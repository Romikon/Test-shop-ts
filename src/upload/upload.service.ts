import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';
import { PassThrough } from 'stream';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = 'AWS_S3_REGION'
    this.bucketName = 'BUCKET_NAME'
    const accessKeyId = 'AWS_ACCESS_KEY'
    const secretAccessKey = 'AWS_SECRET_ACCESS_KEY'

    
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async upload(fileName: string, stream: PassThrough): Promise<string> {
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: fileName,
          Body: stream,
          ContentType: 'image/jpg',
          ContentDisposition: 'inline',
        },
      });

      const result = await upload.done();
      console.log(result);
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error('Upload Error:', error.message);
      throw error;
    }
  }
}
