import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import amqp from 'amqp-connection-manager';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const user = 'admin';
  // const password = 'admin';
  // const host = 'localhost:5672';
  // const queueName = 'AUTH_MESSAGE';

  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://${user}:${password}@${host}`],
  //     queue: queueName,
  //     noAck: false,
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();

  //TODO: create queue service
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
