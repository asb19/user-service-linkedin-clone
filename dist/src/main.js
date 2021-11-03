"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const user = 'admin';
    const password = 'admin';
    const host = 'localhost:5672';
    const queueName = 'AUTH_MESSAGE';
    await app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            noAck: false,
            queueOptions: {
                durable: true,
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map