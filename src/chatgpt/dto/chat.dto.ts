import { Param } from '@discord-nestjs/core';

export class ChatDto {
  @Param({
    name: 'message',
    description: 'Chat with the bot',
    required: true,
  })
  message: string;
}
