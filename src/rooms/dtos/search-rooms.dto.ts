import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationExcludeIds } from 'src/common/dtos';

export class SearchRoomDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class SearchRoomsDto extends PaginationExcludeIds {
  @IsUUID('all', { each: true })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  excludeIds?: Array<string>;
}
