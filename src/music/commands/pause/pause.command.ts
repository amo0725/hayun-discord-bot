import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';

@Command({
  name: 'pause',
  description: '暫停播放',
})
export class PauseCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onPauseCommand(
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

    if (queue.paused) {
      queue.resume();
      return interaction.editReply(`:arrow_forward: 已經繼續為您播放歌曲`);
    }
    queue.pause();
    return interaction.editReply(`:pause_button: 已經為您暫停播放歌曲`);
  }
}
