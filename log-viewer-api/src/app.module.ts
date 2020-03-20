import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogViewerModule } from './log-viewer/log-viewer.module';
import { CLIENT_RENEG_LIMIT } from 'tls';

const Database = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true
});

@Module({
  imports: [Database, LogViewerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
