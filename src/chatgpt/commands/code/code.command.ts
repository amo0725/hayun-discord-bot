import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { CodeDto } from '../../dto/code.dto';
import { CodeService } from './code.service';

@Command({
  name: 'code',
  description: '與和運萬事通討論程式碼',
})
export class CodeCommand {
  constructor(private readonly codeService: CodeService) {}
  @Handler()
  async onCodeCommand(
    @InteractionEvent(SlashCommandPipe) dto: CodeDto,
    @InteractionEvent() interaction: CommandInteraction,
  ) {
    const { message } = dto;
    await interaction.deferReply();
    const replyMsg = await this.codeService.runCompletion(message);
    if (replyMsg) {
      interaction.editReply(replyMsg);
    } else {
      interaction.editReply('和運萬事通出了車禍腦震盪了，請稍後再試......');
    }
  }
}
