import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './modules/url/url.module';
import { RedirectController } from './controllers/url/url.controller';
//import { RedirectController } from './controllers/url/url.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-url-shortener'),
    UrlModule,
  ],
  controllers: [RedirectController],
})
export class AppModule {}
