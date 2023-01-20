import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateEventDTO, EventResponseDTO } from './event.dto';
import { EventRepository } from './event.repository';
import { EmitterEvents } from '../constants/emitter.events';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createEvent(eventBody: CreateEventDTO): Promise<EventResponseDTO> {
    const session = await this.eventRepository.getSession(); //open db session
    session.startTransaction(); //start transaction

    try {
      const newEvent = await this.eventRepository.create(eventBody); //create event instance

      //some actions can be performed between create and save

      await newEvent.save(); //save event to db

      await session.commitTransaction(); //commit transaction if everything is OK

      const eventResponse = new EventResponseDTO(newEvent); //build response data

      this.eventEmitter.emit(EmitterEvents.CREATED, eventResponse); //notify websocket gateway about created event

      return eventResponse;
    } catch (error) {
      await session.abortTransaction(); //rollback transaction on error
      throw error;
    } finally {
      await session.endSession(); //close db session
    }
  }

  async getEventById(_id: string): Promise<EventResponseDTO> {
    try {
      const event = await this.eventRepository.findById(_id);

      if (!event) {
        throw new NotFoundException();
      }

      return new EventResponseDTO(event);
    } catch (error) {
      throw error;
    }
  }

  async getEvents(type?: string): Promise<EventResponseDTO[]> {
    try {
      const events = await this.eventRepository.findAllByType(type);

      return events.map((event) => new EventResponseDTO(event));
    } catch (error) {
      throw error;
    }
  }

  async deleteEventById(_id: string): Promise<HttpStatus> {
    const session = await this.eventRepository.getSession(); //open db session
    session.startTransaction(); //start transaction

    try {
      const event = await this.eventRepository.deleteById(_id); //try to find event by id and delete, deleted event data returned

      if (!event) {
        throw new NotFoundException();
      }

      await session.commitTransaction(); //commit transaction if everything is OK

      this.eventEmitter.emit(
        EmitterEvents.DELETED,
        new EventResponseDTO(event),
      ); //notify websocket gateway about deleted event

      return HttpStatus.NO_CONTENT;
    } catch (error) {
      await session.abortTransaction(); //rollback transaction on error
      throw error;
    } finally {
      await session.endSession(); //close db session
    }
  }
}
