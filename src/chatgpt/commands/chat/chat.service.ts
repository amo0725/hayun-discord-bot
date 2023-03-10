import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../../utils/openai';

@Injectable()
export class ChatService {
  constructor(private readonly openaiService: OpenaiService) {}

  async runCompletion(message) {
    try {
      return await this.openaiService.runTextCompletion(message);
    } catch (error) {
      return false;
    }
  }
}
