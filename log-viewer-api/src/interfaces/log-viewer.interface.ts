import { Log } from "../log-viewer/log.entity";
import { SearchDto } from "../dtos/log-viewer.dto";

export interface ParsedLine {
  uuid?: string;
  httpMethod?: string;
  latency?: number;
  timestamp?: Date;
  fullText: string;
}

export interface ILogViewerService {
  clearLogs(): Promise<void>;
  seedDatabase(parsedLine: ParsedLine): Promise<void>;
  parseLine(line: string): ParsedLine;
  search(params: SearchDto): Promise<[Log[], number]>;
  getLogsByUuid(uuid: string): Promise<Log[]>;
}
