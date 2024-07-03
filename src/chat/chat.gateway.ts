// src/chat.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket  } from '@nestjs/websockets';
import { Server, Socket  } from 'socket.io';

@WebSocketGateway({
    cors: {
      origin: "*", // Permite conexiones desde cualquier origen
      credentials: true // Permite el envío de credenciales (como cookies, información de autenticación, etc.)
    }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('WebSocket iniciado');
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('Cliente conectado:', client.id);
    }

    handleDisconnect(client: any) {
        console.log('Cliente desconectado:', client.id);
    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
        this.server.emit('message', payload); // Emite el mensaje a todos los clientes
    }

    @SubscribeMessage('directMessage')
    handleDirectMessage(@ConnectedSocket() client: Socket, message: { targetId: string, content: string }) {
        this.server.to(message.targetId).emit('message', message.content);
    }
}
