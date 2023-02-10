import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { ChatDto } from '../../dto/chat.dto';
import { ChatService } from './chat.service';
import { CommandInteraction } from 'discord.js';

@Command({
  name: 'chat',
  description: '與和運萬事通聊天',
})
export class ChatCommand {
  constructor(private readonly chatService: ChatService) {}
  @Handler()
  async onChatCommand(
    @InteractionEvent(SlashCommandPipe) dto: ChatDto,
    @InteractionEvent() interaction: CommandInteraction,
  ) {
    const { message } = dto;
    interaction.deferReply();
    const replyMsg = await this.chatService.runCompletion(message);
    if (replyMsg) {
      interaction.editReply(replyMsg);
    } else {
      interaction.editReply('和運萬事通出了車禍腦震盪了，請稍後再試......');
    }
  }
}
