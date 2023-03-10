import { Param } from '@discord-nestjs/core';

export class ChatDto {
  @Param({
    name: 'message',
    description: '訊息',
    required: true,
  })
  message: string;
}
