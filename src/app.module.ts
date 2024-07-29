import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UploadModule, MongooseModule.forRoot('mongodb://localhost:27017/products'), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
