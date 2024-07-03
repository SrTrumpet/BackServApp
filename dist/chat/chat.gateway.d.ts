import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    handleMessage(client: any, payload: any): void;
}
