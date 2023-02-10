import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { SkiptoDto } from '../../dto/skipto.dto';

@Command({
  name: 'skipto',
  description: '跳過多首歌曲',
})
export class SkiptoCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onSkiptoCommand(
    @InteractionEvent(SlashCommandPipe) dto: SkiptoDto,
    @InteractionEvent()
    interaction: CommandInteraction,
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
    await this.distube.jump(message, dto.number).then(() => {
      const queue = this.distube.getQueue(message);
      return interaction.reply(
        `:fast_forward: 已經為您跳過${dto.number} 首歌曲 正在播放 ${queue.songs[0].name} - ${queue.songs[0].formattedDuration}\n`,
      );
    });
  }
}
