import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ENV_PATH } from './constants/token.const';

@Module({})
export class ConfigurationModule {
  static forRoot(options: { path: string }): DynamicModule {
    return {
      providers: [
        {
          provide: ENV_PATH,
          useValue: options.path,
        },
        ConfigurationService,
      ],
      module: ConfigurationModule,
      exports: [ConfigurationService],
      global: true, // global still need to import once, generally in root module
    };
  }
}
