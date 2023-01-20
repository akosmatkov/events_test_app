import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO, EventResponseDTO } from './event.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiCreatedResponse({ type: EventResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad request on validating body' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  createEvent(@Body() eventBody: CreateEventDTO): Promise<EventResponseDTO> {
    return this.eventService.createEvent(eventBody);
  }

  @Get(':_id')
  @ApiOkResponse({ type: EventResponseDTO })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiInternalServerErrorResponse()
  getEventById(@Param('_id') _id: string): Promise<EventResponseDTO> {
    return this.eventService.getEventById(_id);
  }

  @Get()
  @ApiOkResponse({ type: [EventResponseDTO] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiImplicitQuery({ type: String, required: false, name: 'type' })
  getEvents(@Query('type') type: string): Promise<EventResponseDTO[]> {
    return this.eventService.getEvents(type);
  }

  @Delete(':_id')
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiNoContentResponse()
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  deleteEventById(@Param('_id') _id: string): Promise<HttpStatus> {
    return this.eventService.deleteEventById(_id);
  }
}
