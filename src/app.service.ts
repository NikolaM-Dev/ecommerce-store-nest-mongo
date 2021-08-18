import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: Array<any>,
  ) {}

  getHello(): string {
    console.log(this.tasks);

    return `apiKey: ${this.apiKey}`;
  }
}
