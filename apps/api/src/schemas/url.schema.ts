import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Url extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortenedUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  expirationDate: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
