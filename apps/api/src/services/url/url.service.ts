import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from '../../schemas/url.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  // Crear una nueva URL acortada, permitiendo asignación personalizada
  async create(
    originalUrl: string,
    shortenedUrl?: string,
    expirationDate?: Date,
  ): Promise<Url> {
    // Si el usuario no proporciona shortenedUrl, se genera uno automáticamente
    if (!shortenedUrl) {
      shortenedUrl = nanoid(8);
    } else {
      // Verificar si el shortenedUrl ya existe
      const existingUrl = await this.urlModel.findOne({ shortenedUrl }).exec();
      if (existingUrl) {
        throw new BadRequestException('The shortened URL already exists');
      }
    }

    const newUrl = new this.urlModel({
      originalUrl,
      shortenedUrl,
      expirationDate,
    });
    return await newUrl.save();
  }

  // Verificar si la URL acortada ya existe
  async findOne(shortenedUrl: string): Promise<Url> {
    const url = await this.urlModel.findOne({ shortenedUrl }).exec();
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    return url;
  }

  // Redirigir a la URL original
  async redirect(shortenedUrl: string): Promise<string> {
    const url = await this.findOne(shortenedUrl);
    return url.originalUrl;
  }
}
