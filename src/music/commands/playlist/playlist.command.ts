import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction, Message } from 'discord.js';
import { DistubeService } from '../../utils/distube';
import { DisTube } from 'distube';

@Command({
  name: 'playlist',
  description: '播放清單',
})
export class PlaylistCommand {
  private distube: DisTube;
  constructor(private readonly distubeService: DistubeService) {
    this.distube = distubeService.getDistube();
  }
  @Handler()
  async onPlaylistCommand(
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
    const queue = await this.distube.getQueue(message);
    if (!queue || !queue.songs) {
      return interaction.editReply(':man_gesturing_no: 目前播放清單中沒有歌曲');
    }
    const { songs } = queue;
    let playlist = '';
    songs.forEach((song, index) => {
      if (index === 0) {
        playlist += `:notepad_spiral: 播放清單：\n正在播放 ${song.name} - ${song.formattedDuration}\n`;
      }
      if (index !== 0 && index < 10) {
        playlist += `第 ${index + 1} 首 ${song.name} - ${
          song.formattedDuration
        }\n`;
      }
    });
    return interaction.editReply(playlist);
  }
}
