import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  getMessages() {
    return this.messagesService.getAllMessages();
  }

  @Get('/:id')
  async getMessage(@Param('id') messageId) {
    const message = await this.messagesService.getMessageById(messageId);
    console.log('Message is ->', message);
    if (!message) {
      throw new NotFoundException('There is no message with that Id.');
    }
    return message;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.createMessage(body.content);
  }
}

// Manejamos el caso de que no haya mensajes en el controller y tiramos una NotFoundException
