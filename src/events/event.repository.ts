import { Injectable } from '@nestjs/common';
import { ClientSession, Model, Query } from 'mongoose';
import { Event } from './event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDTO } from './event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<Event>,
  ) {}

  getSession(): Promise<ClientSession> {
    return this.eventModel.startSession();
  }

  create(eventBody: CreateEventDTO): Promise<Event> {
    return this.eventModel.create(eventBody);
  }

  findById(_id: string): Query<Event, Event> {
    return this.eventModel.findById(_id);
  }

  findAllByType(type: string): Query<Event[], Event> {
    return this.eventModel.find({ type: type || { $ne: null } });
  }

  deleteById(_id: string): Query<Event, Event> {
    return this.eventModel.findByIdAndDelete(_id);
  }
}
