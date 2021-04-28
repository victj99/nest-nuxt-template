import { ValidationPipe } from '@nestjs/common';
import { NestFactory, } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NuxtServer } from './nuxt';

const isDev = process.env.NODE_ENV !== 'production'

// declare const module: any;

async function bootstrap () {
  const baseUrl = 'api'
  const nuxt = await NuxtServer.getInstance().run(isDev);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(baseUrl)

  const config = new DocumentBuilder().setTitle('Nest API').setVersion('1.0').build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/docs', app, document)
  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))

  const nuxtRender = (req, res, next) => { if (req.url.startsWith('/api')) next(); else nuxt.render(req, res) }
  app.use(nuxtRender)

  app.listen(process.env.PORT || 3000);
}
bootstrap();
