import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3308,
      username: "user",
      password: "password",
      database: "dbservapp",
      autoLoadEntities: true,
      synchronize: true,
    }), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gpl'),
      playground: true,
    }),
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
