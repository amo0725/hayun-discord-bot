import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ChatCommand } from './commands/chat/chat.command';
import { ChatService } from './commands/chat/chat.service';
import { ConfigService } from '@nestjs/config';
import { CodeCommand } from './commands/code/code.command';
import { OpenaiService } from './utils/openai';
import { CodeService } from './commands/code/code.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [
    ChatCommand,
    CodeCommand,
    ChatService,
    CodeService,
    ConfigService,
    OpenaiService,
  ],
})
export class ChatgptModule {}
