import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { ILogViewerService, ParsedLine } from '../interfaces/log-viewer.interface';
import { SearchDto, SortProperty, SortOrder } from '../dtos/log-viewer.dto';

@Injectable()
export class LogViewerService implements ILogViewerService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async search(params: SearchDto): Promise<[Log[], number]> {
    const qb = this.logRepository.createQueryBuilder();
    if (params.methods && params.methods.length > 0) {
      const methods = Array.isArray(params.methods) ? params.methods : params.methods.split(',');
      qb.where('Log.httpMethod IN (:...methods)', { methods });
    }
    if (params.query) {
      qb.andWhere('Log.fullText ilike :query', { query: `%${params.query}%`});
    }
    params.sortProperty = params.sortProperty || SortProperty.NONE;
    params.sortOrder = params.sortOrder || SortOrder.DESC;
    return qb
      .orderBy({
        [params.sortProperty]: params.sortOrder
      })
      .take(params.limit || 100)
      .skip(params.fromOffset || 0)
      .getManyAndCount()
  }

  async getLogsByUuid(uuid: string): Promise<Log[]> {
    return this.logRepository
      .createQueryBuilder()
      .where('Log.uuid = :uuid', { uuid })
      .getMany();
  }

  async clearLogs(): Promise<void> {
    return this.logRepository.clear();
  }

  async seedDatabase(parsedLine: ParsedLine): Promise<void> {
    await this.logRepository.insert(parsedLine);
  }

  // In order to parse a line, we match through a bunch of different
  // RegExp, which isn't the most efficient. Ideally we could have one
  // monster RegExp to do it, but complex regular expressions can be tricky
  // to get right and debug. For the purpose of seeding a database, we go
  // with simple over complex.
  parseLine(line: string): ParsedLine {
    return {
      uuid: this.getUuid(line),
      httpMethod: this.getHttpMethod(line),
      latency: this.getLatency(line),
      timestamp: this.getTimestamp(line),
      fullText: line
    };
  }

  private getUuid(line): string {
    const match = line.match(/^\[([a-z0-9-]+)\]/);
    return match ? match[1] : undefined;
  }

  private getHttpMethod(line): string {
    const match = line.match(/Started (GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH)/);
    return match ? match[1] : undefined;
  }

  private getTimestamp(line): Date {
    const match = line.match(/at (.*)$/);
    if (!match) return undefined;
    let date = new Date(match[1]);
    date = isNaN(date.getTime()) ? undefined : date;
    return date;
  }

  private getLatency(line): number {
    const match = line.match(/in ([0-9]+)ms/);
    return match ? parseInt(match[1]) : undefined;
  }
}