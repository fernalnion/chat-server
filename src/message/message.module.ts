import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageBusiness } from 'src/business';
import { MessageSchema } from 'src/schemas/message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

const SERVICES: any[] = [MessageService, MessageBusiness];
const MONGOOSE_SCHEMA: any[] = [{ name: 'Message', schema: MessageSchema }];

@Module({
  imports: [MongooseModule.forFeature(MONGOOSE_SCHEMA)],
  providers: [...SERVICES],
  controllers: [MessageController],
})
export class MessageModule {}
