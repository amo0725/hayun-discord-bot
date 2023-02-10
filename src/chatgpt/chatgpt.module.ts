import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ChatCommand } from './commands/chat/chat.command';
import { ChatService } from './commands/chat/chat.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [ChatCommand, ChatService, ConfigService],
})
export class ChatgptModule {}
