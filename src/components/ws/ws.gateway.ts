import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { WsTotalResponse } from './ws-total.response';

@WebSocketGateway({ cors: true })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger = new Logger('MessageWsGateway');

  public handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnect: ${client.id}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug(`Client connect: ${client.id}`);
  }

  public sendEmitTotal(WsTotalResponse: WsTotalResponse) {
    this.logger.log(
      `Topic => ${WsTotalResponse.topic} Total => ${WsTotalResponse.total}`,
    );
    this.wss.emit(WsTotalResponse.topic, WsTotalResponse);
  }
}
