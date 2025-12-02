import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * Bootstrap the NestJS application
 * - OpenAPI 3.1 documentation
 * - Global validation pipe
 * - API versioning
 * - CORS configuration
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API versioning (v1, v2, etc.)
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global validation pipe with Zod-like behavior
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // CORS - configure for your frontend domain in production
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger OpenAPI 3.1 documentation
  const config = new DocumentBuilder()
    .setTitle('PriceWatch API')
    .setDescription('Competitive Intelligence & Counter-Attack Automation API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users', 'User management')
    .addTag('competitors', 'Competitor tracking')
    .addTag('scans', 'Competitor scanning')
    .addTag('counter-attacks', 'Automated counter-attacks')
    .addTag('integrations', 'External service integrations')
    .addTag('webhooks', 'Webhook management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`🚀 API running on http://localhost:${port}`);
  console.log(`📚 Swagger docs at http://localhost:${port}/docs`);
}

bootstrap();
