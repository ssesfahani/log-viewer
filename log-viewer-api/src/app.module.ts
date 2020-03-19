import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogViewerModule } from './log-viewer/log-viewer.module';

// TODO: ENV all this stuff
const Database = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'postgres', // This refers to the docker-compose `postgres` section
  port: 5432,
  username: 'user',
  password: 'pass',
  database: 'db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true
});

@Module({
  imports: [Database, LogViewerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
