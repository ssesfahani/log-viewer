import { Controller, OnModuleInit, Inject, Logger, Get, Query, UseInterceptors, ClassSerializerInterceptor, Param } from '@nestjs/common';
import { Interface, createInterface } from 'readline';
import { ReadStream, createReadStream } from 'fs';
import { SearchDto } from '../dtos/log-viewer.dto';
import { Log } from './log.entity';
import { ILogViewerService, ParsedLine } from '../interfaces/log-viewer.interface';
import { JSONAPIResult, JSONAPIData } from 'src/interfaces/json-api.interface';

@Controller('logs')
export class LogViewerController implements OnModuleInit {
  constructor(
    @Inject('ILogViewerService')
    private logViewerService: ILogViewerService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async search(@Query() query: SearchDto): Promise<JSONAPIResult> {
    const result = await this.logViewerService.search(query);
    const logs: Log[] = result[0];
    const data = this._mapLogsToJSONAPIData(logs);
    const total = result[1];
    return {
      data,
      meta: {
        total
      }
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  async getLogsByUuid(@Param('uuid') uuid: string): Promise<JSONAPIResult> {
    const result = await this.logViewerService.getLogsByUuid(uuid);
    const data = this._mapLogsToJSONAPIData(result);
    return {
      data,
      meta: {
        total: result.length
      }
    }
  }

  _mapLogsToJSONAPIData(logs: Log[]): JSONAPIData[] {
    return logs.map((log) => {
      return {
        id: log.id,
        type: 'logs',
        attributes: log
      };
    });
  }

  async onModuleInit() {
    Logger.log('Clearing logs first...');
    await this.logViewerService.clearLogs();

    Logger.log('Seeding logs into db...');
    const sampleFile = this._getSampleFile('./dist/sample.log');
    await this._parseSampleFile(sampleFile);
  }

  async _parseSampleFile(sampleFile: Interface): Promise<void> {
    let lastUuid: string;
    for await (const line of sampleFile) {
      if (line.length > 0) {
        const lineParsed: ParsedLine = this.logViewerService.parseLine(line);
        // If we come across a line that has no uuid match, just assume it is
        // part of the last line. This is to account for DEPRECATION WARNING messages
        if (!lineParsed.uuid) {
          lineParsed.uuid = lastUuid;
        }
        lastUuid = lineParsed.uuid;

        await this.logViewerService.seedDatabase(lineParsed);
      }
    }
  }

  _getSampleFile(logFilePath: string): Interface {
    const fileStream: ReadStream = createReadStream(logFilePath);
    return createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  }
  
}
