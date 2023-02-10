import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';

@Command({
  name: 'stop',
  description: '跳過目前正在播放的歌曲',
})
export class StopCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onStopCommand(
    @InteractionEvent() interaction: CommandInteraction,
    @InteractionEvent() message: Message,
  ) {
    const { member } = message;
    const voiceChannel = member.voice.channel;
    if (!voiceChannel) {
      return interaction.editReply(
        ':no_entry_sign: 你沒有加入語音頻道，請加入語音頻道後再試......',
      );
    }
    const queue = this.distube.getQueue(message);
    if (!queue) {
      return interaction.reply(':man_gesturing_no: 目前沒有正在播放的歌曲');
    }
    queue.stop();
    return interaction.reply(`:stop_button: 已經為您停止播放音樂`);
  }
}
