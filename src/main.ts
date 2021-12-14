import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('User Service Api')
    .setDescription('user service api doc')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  //TODO: create queue service
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
