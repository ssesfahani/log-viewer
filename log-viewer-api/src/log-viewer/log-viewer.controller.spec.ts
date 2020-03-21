import { Test, TestingModule } from '@nestjs/testing';
import { LogViewerController } from './log-viewer.controller';
import { ILogViewerService } from 'src/interfaces/log-viewer.interface';

describe('LogViewer Controller', () => {
  let controller: LogViewerController;
  let spyLogViewerService: ILogViewerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogViewerController],
      providers: [
        {
          provide: 'ILogViewerService',
          useFactory: () => ({
            search: jest.fn(() => [[{ id: 1, uuid: 'abc', fullText: '[abc] full text' }], 0]),
            getLogsByUuid: jest.fn(() => [])
          })
        }
      ],
    }).compile();

    controller = module.get<LogViewerController>(LogViewerController);
    spyLogViewerService = module.get<ILogViewerService>('ILogViewerService');
  });

  it('should call logViewerService search', async () => {
    await controller.search({});
    expect(spyLogViewerService.search).toHaveBeenCalled();
  });

  it('should call logViewerService getLogsByUuid', async () => {
    await controller.getLogsByUuid('uuid');
    expect(spyLogViewerService.getLogsByUuid).toHaveBeenCalled();
  });
});
