import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appPort = configService.get("PORT")
  const isDev = configService.get<string>('NODE_ENV') !== 'production';
  const frontendDomain = configService.get<string>('FRONTEND_DOMAIN');

  app.enableCors({
    origin: isDev ? [frontendDomain] : undefined,
    methods: ["GET","HEAD", "PUT", "POST", "DELETE"],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'Authorization'],
    credentials: true,
  });

  console.log('App is running on port:', appPort);
  await app.listen(appPort);
}
bootstrap();
