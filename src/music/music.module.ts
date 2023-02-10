import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DistubeService } from './utils/distube';
import { NowplayingCommand } from './commands/nowplaying/nowplaying.command';
import { PauseCommand } from './commands/pause/pause.command';
import { PlayCommand } from './commands/play/play.command';
import { PlaylistCommand } from './commands/playlist/playlist.command';
import { ShuffleCommand } from './commands/shuffle/shuffle.command';
import { SkipCommand } from './commands/skip/skip.command';
import { SkiptoCommand } from './commands/skipto/skipto.command';
import { StopCommand } from './commands/stop/stop.command';
import { VolumeCommand } from './commands/volume/volume.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [
    NowplayingCommand,
    PauseCommand,
    PlayCommand,
    PlaylistCommand,
    ShuffleCommand,
    SkipCommand,
    SkiptoCommand,
    StopCommand,
    VolumeCommand,
    ConfigService,
    DistubeService,
  ],
})
export class MusicModule {}
