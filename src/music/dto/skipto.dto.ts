import { Param, ParamType } from '@discord-nestjs/core';

export class SkiptoDto {
  @Param({
    name: 'number',
    description: '歌曲 No.',
    required: true,
    type: ParamType.INTEGER,
  })
  number: number;
}
