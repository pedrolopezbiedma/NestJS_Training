import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  getMessages(): string[] {
    return ['Message 1', 'Message 2'];
  }

  @Get(':id')
  getMessage(messageId: number): string {
    return 'Message 1';
  }

  @Post()
  createMessage(message): string {
    return 'Message created';
  }
}
