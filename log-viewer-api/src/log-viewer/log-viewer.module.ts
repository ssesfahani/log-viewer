import { Module } from '@nestjs/common';
import { LogViewerService } from './log-viewer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { LogViewerController } from './log-viewer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [
    {
      provide: 'ILogViewerService',
      useClass: LogViewerService
    }
  ],
  controllers: [LogViewerController]
})
export class LogViewerModule {}
