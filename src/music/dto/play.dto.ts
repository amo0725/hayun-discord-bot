import { Param } from '@discord-nestjs/core';

export class PlayDto {
  @Param({
    name: 'song',
    description: 'Play a song',
    required: true,
  })
  song: string;
}
