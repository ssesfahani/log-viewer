import { Test, TestingModule } from '@nestjs/testing';
import { LogViewerService } from './log-viewer.service';
import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LogViewerService', () => {
  let service: LogViewerService;
  let spyRepository: Repository<Log>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogViewerService,
        {
          provide: getRepositoryToken(Log),
          useFactory: () => ({
            insert: jest.fn(() => true),
            clear: jest.fn(() => true)
          })
        }
      ]
    }).compile();

    service = module.get<LogViewerService>(LogViewerService);
    spyRepository = module.get(getRepositoryToken(Log));
  });

  it('should clear the database properly', async () => {
    await service.clearLogs();
    expect(spyRepository.clear).toHaveBeenCalled();
  });

  it('should insert using the repository', async () => {
    const params = {
      fullText: 'Test'
    };
    await service.seedDatabase(params);
    expect(spyRepository.insert).toHaveBeenCalledWith(params);
  });

  it('should parse a uuid', () => {
    const uuid = '814666e5-bb22-4955-81d2-c881cadeb1c7';
    
    let lineParsed = service.parseLine(`[${uuid}] [paperclip] Saving attachments.`);
    expect(lineParsed.uuid).toEqual(uuid);

    lineParsed = service.parseLine(`[${uuid}] DEPRECATION WARNING: The following options in your Series.has_many
      :issues declaration are deprecated: :order. Please use a scope block instead. For example, the following:`);
    expect(lineParsed.uuid).toEqual(uuid);

    lineParsed = service.parseLine("    has_many :spam_comments, conditions: { spam: true }, class_name: 'Comment'");
    expect(lineParsed.uuid).toBeUndefined;
  });

  it('should parse the HTTP method', () => {
    const methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];

    for (const method of methods) {
      const lineParsed = service.parseLine(`[f5fdaff7-0c0b-4fef-ab57-906407e69852] Started ${method} "/assets/vendor/flat-ui/toggle.png" for 204.148.13.194 at 2016-03-30 16:07:52 -0400`);
      expect(lineParsed.httpMethod).toEqual(method);
    }

    const lineParsed = service.parseLine('[f5fdaff7-0c0b-4fef-ab57-906407e69852] Started INVALID method');
    expect(lineParsed.httpMethod).toBeUndefined;
  });

  it('should parse the timestamp', () => {
    let lineParsed = service.parseLine(`[f5fdaff7-0c0b-4fef-ab57-906407e69852] Started GET "/assets/vendor/flat-ui/toggle.png" for 204.148.13.194 at 2016-03-30 16:07:52 -0400`);
    expect(lineParsed.timestamp).toEqual(new Date('2016-03-30 16:07:52 -0400'));

    lineParsed = service.parseLine(`[f5fdaff7-0c0b-4fef-ab57-906407e69852] Started GET "/assets/vendor/flat-ui/toggle.png" for 204.148.13.194 at some-invalid-timestamp`);
    expect(lineParsed.timestamp).toBeUndefined;
  });

  it('should parse the overall latency', () => {
    const latency = 16;
    let lineParsed = service.parseLine(`[21f0f8d4-c281-4567-9ffe-bd52e7bf32d5] Completed 200 OK in ${latency}ms (Views: 8.3ms | ActiveRecord: 4.6ms)`);
    expect(lineParsed.latency).toEqual(latency);

    lineParsed = service.parseLine(`[f5fdaff7-0c0b-4fef-ab57-906407e69852] Some event without a latency`);
    expect(lineParsed.latency).toBeUndefined;
  });
});
