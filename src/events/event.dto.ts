import { IsNotEmpty, IsString } from 'class-validator';
import { Event } from './event.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  type: string;
}

export class EventResponseDTO {
  constructor(event: Event) {
    this._id = event._id;
    this.name = event.name;
    this.description = event.description;
    this.type = event.type;
  }

  @ApiProperty({ type: String, description: 'MongoDB ObjectId' })
  _id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  type: string;
}
