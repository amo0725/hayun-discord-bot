import { InjectDiscordClient } from '@discord-nestjs/core';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { DisTube, Queue } from 'distube';

@Injectable()
export class DistubeService {
  private distube: DisTube;
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {
    this.distube = new DisTube(this.client, {
      leaveOnStop: false,
      emitNewSongOnly: true,
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      plugins: [
        new SpotifyPlugin({
          emitEventsAfterFetching: true,
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
      ],
    });
  }

  public status = (queue: Queue) =>
    `音量: \`${queue.volume}%\` | 隨機播放: \`${
      queue.filters.names.join(', ') || '關'
    }\` | 循環播放: \`${
      queue.repeatMode ? (queue.repeatMode === 2 ? '全部' : '單曲') : '關'
    }\` | 自動播放: \`${queue.autoplay ? '開' : '關'}\``;

  public getDistube(): DisTube {
    return this.distube;
  }
}
