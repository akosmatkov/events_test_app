import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { Event } from '../events/event.schema';
import { EmitterEvents } from '../constants/emitter.events';
import { EventResponseDTO } from '../events/event.dto';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  private server: Server;

  @OnEvent(EmitterEvents.CREATED)
  onEventCreated(event: EventResponseDTO) {
    this.server.emit(event.type, { message: 'Event created', event });
  }

  @OnEvent(EmitterEvents.DELETED)
  onEventDeleted(event: EventResponseDTO) {
    this.server.emit(event.type, { message: 'Event deleted', event });
  }
}
