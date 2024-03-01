import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    app.setGlobalPrefix('api/v2');
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        })
    );

    const port = process.env.PORT;
    await app.listen(port);
    console.log(`App escuchando en el puerto: ${port}`);
}
bootstrap();
