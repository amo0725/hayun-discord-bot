import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../../utils/openai';

@Injectable()
export class CodeService {
  constructor(private readonly openaiService: OpenaiService) {}

  async runCompletion(message) {
    try {
      return await this.openaiService.runCodeCompletion(message);
    } catch (error) {
      return false;
    }
  }
}
