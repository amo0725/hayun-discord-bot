import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { PlayDto } from '../../dto/play.dto';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';

@Command({
  name: 'play',
  description: '播放指定歌曲',
})
export class PlayCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onPlayCommand(
    @InteractionEvent(SlashCommandPipe) dto: PlayDto,
    @InteractionEvent() interaction: CommandInteraction,
    @InteractionEvent() message: Message,
  ) {
    await interaction.deferReply();
    const { member } = message;
    const voiceChannel = member.voice.channel;
    const textChannel = interaction.channel;
    if (!voiceChannel) {
      return interaction.reply(
        ':no_entry_sign: 你沒有加入語音頻道，請加入語音頻道後再試......',
      );
    }
    const { song } = dto;
    await this.distube.play(voiceChannel, song, {
      textChannel,
      member,
    });
    const queue = this.distube.getQueue(message);
    if (!queue) {
      return interaction.reply(':no_entry_sign: 播放失敗，請稍後再試......');
    }
    const { songs } = queue;
    const { length } = songs;

    if (length > 1) {
      return interaction.reply(
        `:white_check_mark: 已加入播放清單 ${songs[length - 1].name} - ${
          songs[length - 1].formattedDuration
        }`,
      );
    }

    return interaction.reply(
      `:arrow_forward: 正在播放 ${songs[0].name} - ${songs[0].formattedDuration}`,
    );
  }
}
