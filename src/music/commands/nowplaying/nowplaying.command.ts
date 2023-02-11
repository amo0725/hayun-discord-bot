import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';

@Command({
  name: 'nowplaying',
  description: '正在播放的歌曲',
})
export class NowplayingCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onNowplayingCommand(
    @InteractionEvent() interaction: CommandInteraction,
    @InteractionEvent() message: Message,
  ) {
    await interaction.deferReply();
    const { member } = message;
    const voiceChannel = member.voice.channel;
    if (!voiceChannel) {
      return interaction.editReply(
        ':no_entry_sign: 你沒有加入語音頻道，請加入語音頻道後再試......',
      );
    }
    const queue = this.distube.getQueue(message);
    if (!queue)
      return interaction.editReply(`:man_gesturing_no: 目前沒有正在播放的歌曲`);
    const song = queue.songs[0];
    return interaction.editReply(
      `:arrow_forward: 目前正在播放 ${song.name} - ${song.formattedDuration}\n`,
    );
  }
}
