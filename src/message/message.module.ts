import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageService } from './message.service';

import { MessageSchema } from 'src/schemas/message.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ],
    providers: [MessageService],
    exports: [MessageService],
    controllers: [],
})
export class MessageModule {}
