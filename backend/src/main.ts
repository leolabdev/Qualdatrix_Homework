import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appPort = configService.get("PORT")
  const isDev = configService.get<string>('NODE_ENV') !== 'production';
  const frontendDomain = configService.get<string>('FRONTEND_DOMAIN');

  app.enableCors({
    origin: isDev ? [frontendDomain] : [],
    methods: ["GET","HEAD", "PUT", "POST", "DELETE"],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('Course Subscription API')
      .setDescription('API for managing courses and subscriptions')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  console.log('App is running on port:', appPort);
  await app.listen(appPort);
}
bootstrap();
