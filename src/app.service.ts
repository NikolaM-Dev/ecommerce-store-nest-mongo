import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: Array<any>,
    private configService: ConfigService,
  ) {}

  getHello(): string {
    const apikey = this.configService.get<string>('API_KEY');
    const dbName = this.configService.get<string>('DATABASE_NAME');
    return `apiKey: ${apikey}, dbName: ${dbName}`;
  }
}
