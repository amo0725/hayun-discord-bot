import { Param, ParamType } from '@discord-nestjs/core';

export class VolumeDto {
  @Param({
    name: 'volume',
    description: '音量',
    required: true,
    type: ParamType.INTEGER,
  })
  volume: number;
}
