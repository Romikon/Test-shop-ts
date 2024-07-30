import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UploadService } from './upload.service';
  import { PassThrough } from 'stream';
  
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File,): Promise<string> {
      const passThrough = new PassThrough();
      passThrough.end(file.buffer);
      console.log(file)
      return this.uploadService.upload(file.originalname, passThrough);
    }
  }