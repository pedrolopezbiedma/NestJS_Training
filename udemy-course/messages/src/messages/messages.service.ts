import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private messagesRepo: MessageRepository) {}

  async getAllMessages() {
    return this.messagesRepo.getAllMessages();
  }

  getMessageById(messageId: string) {
    return this.messagesRepo.getMessageById(messageId);
  }

  createMessage(messageContent: string) {
    return this.messagesRepo.createMessage(messageContent);
  }
}
