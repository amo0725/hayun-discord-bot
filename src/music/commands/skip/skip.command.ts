import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';

@Command({
  name: 'skip',
  description: '跳過目前正在播放的歌曲',
})
export class SkipCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onSkipCommand(
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
    if (!queue) {
      return interaction.editReply(':man_gesturing_no: 目前播放清單中沒有歌曲');
    }
    const song = await queue.skip();
    if (!song) {
      return interaction.editReply(`已經沒有歌曲可以跳過了`);
    }
    return interaction.editReply(
      `:track_next: 現在播放 ${song.name} - ${song.formattedDuration}`,
    );
  }
}
