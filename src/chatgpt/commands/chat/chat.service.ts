import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private openai: OpenAIApi;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: new ConfigService().get('OPENAI_API_KEY'),
      }),
    );
  }

  async runCompletion(message) {
    try {
      const completion = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        max_tokens: 2048,
        temperature: 0.9,
      });
      return completion.data.choices[0].text;
    } catch (error) {
      return false;
    }
  }
}
