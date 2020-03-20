import { ApiProperty } from "@nestjs/swagger";

export enum SortOrder {
  ASC='ASC',
  DESC='DESC'
}

export enum SortProperty {
  NONE='id',
  TIMESTAMP='timestamp',
  LATENCY='latency'
}

export enum HttpMethods {
  GET='GET',
  PUT='PUT',
  POST='POST',
  PATCH='PATCH',
  DELETE='DELETE',
  TRACE='TRACE',
  HEAD='HEAD',
  CONNECT='CONNECT',
  OPTIONS='OPTIONS'
}

export class SearchDto {
  @ApiProperty({ required: false, default: 100 })
  limit?: number = 100;

  @ApiProperty({ required: false, default: 0 })
  fromOffset?: number = 0;

  @ApiProperty({ description: 'Search full text with a naive ILIKE operation', required: false })
  query?: string = '';

  @ApiProperty({ required: false, enum: SortOrder, default: SortOrder.DESC })
  sortOrder?: SortOrder = SortOrder.DESC;

  @ApiProperty({ required: false, enum: SortProperty, default: SortProperty.NONE })
  sortProperty?: SortProperty = SortProperty.NONE;

  @ApiProperty({ description: 'Array of HTTP methods to filter by', type: [String], required: false, enum: HttpMethods })
  methods?: HttpMethods[] | String = []
}
