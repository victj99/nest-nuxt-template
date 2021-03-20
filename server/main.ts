import { NestFactory, } from '@nestjs/core';
import { AppModule } from './app.module';
import { NuxtServer } from './nuxt';
import { NuxtFilter } from './nuxt/nuxtExpress.filter';

const isDev = process.env.NODE_ENV !== 'production'

declare const module: any;

async function bootstrap() {
  const nuxt = await NuxtServer.getInstance().run(isDev);

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new NuxtFilter(nuxt));

  app.setGlobalPrefix('/api')
  app.listen(3000);
}
bootstrap();
