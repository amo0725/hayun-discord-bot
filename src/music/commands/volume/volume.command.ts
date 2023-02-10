import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';
import { VolumeDto } from '../../dto/volume.dto';
import { SlashCommandPipe } from '@discord-nestjs/common';

@Command({
  name: 'volume',
  description: '調整目前正在播放的歌曲的音量',
})
export class VolumeCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onVolumeCommand(
    @InteractionEvent(SlashCommandPipe) dto: VolumeDto,
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
    queue.setVolume(dto.volume);
    return interaction.reply(
      `:loud_sound: 已經為您調整目前正在播放的歌曲的音量至 ${dto.volume}`,
    );
  }
}
