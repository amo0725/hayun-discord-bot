import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayIntentBits } from 'discord.js';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_BOT_TOKEN'),
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
          ],
        },
        registerCommandOptions: [
          {
            forGuild: configService.get('GUILD_ID_2'),
            removeCommandsBefore: true,
          },
          {
            forGuild: configService.get('GUILD_ID_1'),
            removeCommandsBefore: true,
          },
        ],
      }),
      inject: [ConfigService],
    }),
    ChatgptModule,
    MusicModule,
  ],
})
export class AppModule {}
