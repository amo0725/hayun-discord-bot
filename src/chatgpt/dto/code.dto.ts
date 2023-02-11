import { Param } from '@discord-nestjs/core';

export class CodeDto {
  @Param({
    name: 'message',
    description: '訊息',
    required: true,
  })
  message: string;
}
