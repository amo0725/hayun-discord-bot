import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';

@Command({
  name: 'shuffle',
  description: '隨機播放清單中的歌曲',
})
export class ShuffleCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onShuffleCommand(
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
      return interaction.reply(':man_gesturing_no: 目前播放清單中沒有歌曲');
    }
    queue.shuffle();
    const nowQueue = await this.distube.getQueue(message);
    const { songs } = nowQueue;
    let playlist = '';
    songs.forEach((song, index) => {
      if (index === 0) {
        playlist += `:twisted_rightwards_arrows: 已經為您隨機播放清單中的歌曲\n:notepad_spiral: 播放清單：\n正在播放 ${song.name} - ${song.formattedDuration}\n`;
      }
      if (index !== 0 && index < 10) {
        playlist += `第 ${index + 1} 首 ${song.name} - ${
          song.formattedDuration
        }\n`;
      }
    });
    return interaction.reply(playlist);
  }
}
