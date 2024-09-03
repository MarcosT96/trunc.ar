import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UrlService } from '../../services/url/url.service';
import { FastifyReply } from 'fastify';

@Controller('api/urls') // Esto ahora se refiere a '/api/urls' debido al prefijo global
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  // Crear una nueva URL acortada
  @Post()
  async create(
    @Body('originalUrl') originalUrl: string,
    @Body('shortenedUrl') shortenedUrl?: string,
    @Body('expirationDate') expirationDate?: Date,
  ) {
    const url = await this.urlService.create(
      originalUrl,
      shortenedUrl,
      expirationDate,
    );
    return { shortenedUrl: url.shortenedUrl };
  }

  // Verificar si la URL acortada existe
  @Get(':shortenedUrl')
  async findOne(@Param('shortenedUrl') shortenedUrl: string) {
    const url = await this.urlService.findOne(shortenedUrl);
    return { originalUrl: url.originalUrl };
  }
}

// Redirigir a la URL original usando un slug, fuera del prefijo 'api'
@Controller()
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Get('/u/:shortenedUrl')
  async redirect(
    @Param('shortenedUrl') shortenedUrl: string,
    @Res() res: FastifyReply, // Cambiar a FastifyReply
  ) {
    const originalUrl = await this.urlService.redirect(shortenedUrl);
    return res.status(HttpStatus.FOUND).redirect(originalUrl);
  }
}
