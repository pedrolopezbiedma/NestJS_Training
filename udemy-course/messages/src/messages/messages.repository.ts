import { readFile, writeFile } from 'fs/promises';

export class MessageRepository {
  async getAllMessages() {
    const messages = await this.readFile();
    return messages;
  }

  async getMessageById(messageId: string) {
    const messages = await this.readFile();
    return messages[messageId];
  }

  async createMessage(messageContent: string) {
    const messages = await this.readFile();
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content: messageContent };
    await this.writeFile(messages);
    return 'New message created with id: ' + id;
  }

  private async readFile() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  }

  private async writeFile(messages: Promise<string>) {
    await writeFile('messages.json', JSON.stringify(messages));
  }
}
