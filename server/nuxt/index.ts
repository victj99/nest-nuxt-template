import { Nuxt, Builder } from 'nuxt';
import { Logger } from '@nestjs/common';
import config from '../../nuxt.config';

const log = new Logger('NuxtServer');

export class NuxtServer {
  private static instance: NuxtServer;
  public nuxt: Nuxt;

  public async run (isDev = true): Promise<Nuxt> {
    const nuxt = new Nuxt(config);
    await nuxt.ready();

    // Build only in dev mode
    if (isDev) {
      log.debug('building for dev');
      const builder = new Builder(nuxt);
      const res = await builder.build();
      this.nuxt = res.nuxt;

      return this.init(res.nuxt);
    }

    if (this.nuxt) {
      log.debug('reusing existing nuxt');
      return this.nuxt;
    }

    log.debug('fresh instance of nuxt');
    return this.init(nuxt);
  }

  public static getInstance (): NuxtServer {
    if (!this.instance) {
      this.instance = new NuxtServer();
    }

    return this.instance;
  }

  private init (nuxt: Nuxt): Nuxt {
    nuxt.hook('render:route', (url) => {
      log.debug(`path called ${url}`)
    });

    nuxt.hook('render:errorMiddleware', (app) =>
      app.use((err, next) => {
        log.error(err.message);
        next(err);
      }),
    );

    return nuxt;
  }

  async close (): Promise<void> {
    if (this.nuxt) {
      await this.nuxt.close();
    }
  }
}
